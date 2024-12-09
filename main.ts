//--------------------------------------------------------------------------------------
//
// GradeBox plugin for Obsidian
//
// Mike Jipping, Spring 2024
//
// As a way to learn plugins for Obsidian and Javascript, this plugin was written.  
// Several conceptual challenges: should plugins be this big?  should plugins 
// represent an entire app?  what would a score keeping program look like if it
// were based on notes?

import {
	     App,
	     DropdownComponent,
	     Menu,
	     Modal,
	     Notice,
	     Plugin,
	     PluginSettingTab,
	     Setting,
	     TAbstractFile,
	     TFile,
	     TFolder,
	     TextComponent,
	     ViewState,
	     WorkspaceLeaf
} from 'obsidian';
import { GradeSetSummaryView, VIEW_TYPE_GRADESET_SUMMARY } from "./GradeSetSummaryView";
import { GradeboxView, VIEW_TYPE_GRADEBOX } from "./GradeboxView";
import { StudentView, VIEW_TYPE_STUDENT } from "./StudentView"

import { Dialog } from './utilities/Dialog'
import { GradeSet } from "./data/GradeSet";
import { NewGradeSetModal0 } from "./modals/NewGradeSetModal";
import { RecentFilesModal } from "./modals/RecentFilesModal";
import { Student } from "./data/Student";
import services from './services.json';

interface GradeBoxPluginSettings {
	numberOfRecentFiles: string;
	url: string;
	template: string;
	colorDivider1: string;
	colorDivider2: string;

	useAuthentication: boolean;
	username: string;
	password: string;
	smtphost: string;
	smtpport: string;
	encryption: string;
	receiver: string;
	from: string;
	defaultto: string;
	subject: string;
	service: string;
	secure: string;
	delay: string;

	XMLfilename: string;
	whenToGenerate: string;
	useTRMNL: boolean;
	TRMNLpluginID: string;

	recentFile1: string;
	recentFile2: string;
	recentFile3: string;

}

const DEFAULT_SETTINGS: GradeBoxPluginSettings = {
	numberOfRecentFiles: "3",
	url: '',
	template: '',
	colorDivider1: "90",
	colorDivider2: "60",

	useAuthentication: false,
	username: 'nobody',
	password: '',
	smtphost: 'smtp.gmail.com',
	smtpport: "465",
	encryption: "None",
	receiver: "",
	from: "",
	defaultto: '',
	subject: "",
	service: "",
	secure: "None",
	delay: "10",

	XMLfilename: "grades.xml",
	whenToGenerate: "close",
	useTRMNL: true,
	TRMNLpluginID: "XXXXX",

	recentFile1: "",
	recentFile2: "",
	recentFile3: "",

}


export default class GradeboxPlugin extends Plugin {

	settings: GradeBoxPluginSettings;
	
	currentStudent: Student;
	gradeSet: GradeSet;

	gradeBoxView : GradeboxView;

	version: string = "1.2.5 (093024)";

	rotateRecentFiles(filePath: string) {
		if (filePath.length == 0) return;

		if (filePath === this.settings.recentFile1) return;
		if (filePath === this.settings.recentFile2) return;
		if (filePath === this.settings.recentFile3) return;
					
		this.settings.recentFile3 = this.settings.recentFile2;
		this.settings.recentFile2 = this.settings.recentFile1;
		this.settings.recentFile1 = filePath;

		this.saveSettings();
	}

	async onload() {
		console.log('loading plugin');

		await this.loadSettings();

		this.registerView(
			VIEW_TYPE_GRADEBOX,
			(leaf) => new GradeboxView(leaf, this)
		  );	  
		this.registerView(
			VIEW_TYPE_GRADESET_SUMMARY,
			(leaf) => new GradeSetSummaryView(leaf, this)
		  );	
		this.registerView(
			VIEW_TYPE_STUDENT,
			(leaf) => new StudentView(leaf, this, null)
		  );
		  
		const ribbonIconEl = this.addRibbonIcon('package-open', 'GradeBox Plugin', (evt: MouseEvent) => {
			new RecentFilesModal(this.app, this.settings.recentFile1, this.settings.recentFile2, this.settings.recentFile3, async (filePath: string) => {
				const folder = this.app.vault.getAbstractFileByPath(filePath) as TFolder;
				this.rotateRecentFiles(filePath);
				this.openGradeSet(folder);
			}).open();
		});
		
		this.addCommand({
			id: 'open-gradeset',
			name: 'Open GradeSet',
			callback: () => {
					
			}
		});
		
		this.registerEvent(
			this.app.workspace.on("file-menu", (menu, file, source, view) => {
				if (file instanceof TFolder) {
					menu.addItem((item) => {
						item
						.setTitle("Open as GradeSet")
						.setIcon("package-open")
						.onClick(async () => {
							this.rotateRecentFiles(file.path);
							this.openGradeSet(file)
						});
					});
					return;
				}
			})
		  );

		this.addSettingTab(new GradeBoxSettingsTab(this.app, this));

		this.gradeBoxView = null;
	}

	onunload() {
		console.log('unloading plugin');
		this.app.workspace.detachLeavesOfType(VIEW_TYPE_STUDENT);
		this.app.workspace.detachLeavesOfType(VIEW_TYPE_GRADESET_SUMMARY);
		this.app.workspace.detachLeavesOfType(VIEW_TYPE_GRADEBOX);
	}

	async loadSettings() {
		this.settings = Object.assign({}, DEFAULT_SETTINGS, await this.loadData());
	}

	async saveSettings() {
		await this.saveData(this.settings);
	}

	fileExists(fileName: string, folder: TFolder): Boolean {
		var res: boolean = false;
		let file = folder.children.find(afile => afile.name === fileName);
		return (file !== undefined);
	}

	async openGradeSet(folder: TFolder) {
		if (folder.children.length == 0 || ! this.fileExists("CLASS.md", folder)) {
			this.newGradeSetFile(folder);
			return;
		}

		this.gradeSet = new GradeSet(this);
		this.gradeSet.setsourceFolder(folder);
		if (folder.children.length > 0) {
			folder.children.forEach( async (absfile: TAbstractFile, index: number) => {
				let file = absfile as TFile;
				console.log("PROCESSING "+file.name);
				if (file.name !== 'undefined') {
					let data = await app.vault.read( file );
					if (file.name === "CLASS.md") {
						await this.gradeSet.defineGradeSet(data, folder, file);
					} else {
						if (file.name.endsWith(".md"))
							await this.gradeSet.defineStudent(data, file);
					}
			
					console.log(this.gradeSet);

					if (index == folder.children.length-1) {
						this.app.workspace.detachLeavesOfType(VIEW_TYPE_GRADEBOX);
						this.app.workspace.detachLeavesOfType(VIEW_TYPE_STUDENT);
						this.app.workspace.detachLeavesOfType(VIEW_TYPE_GRADESET_SUMMARY);
				
						this.app.workspace.getLeaf().setViewState({
							type: VIEW_TYPE_GRADEBOX,
							state: { folder: folder },
						});
					}		
				}
			});
		} else {
			this.app.workspace.detachLeavesOfType(VIEW_TYPE_GRADEBOX);
			this.app.workspace.detachLeavesOfType(VIEW_TYPE_STUDENT);
			this.app.workspace.detachLeavesOfType(VIEW_TYPE_GRADESET_SUMMARY);
	
			this.app.workspace.getLeaf().setViewState({
				type: VIEW_TYPE_GRADEBOX,
				state: { folder: folder },
			});

		}

	}

	async newGradeSetFile(folder: TFolder) {
		const targetFolder = folder
		  ? folder
		  : app.fileManager.getNewFileParent(
			  app.workspace.getActiveFile()?.path || ''
			);
	
		try {
		  this.app.workspace.detachLeavesOfType(VIEW_TYPE_GRADEBOX);
		  this.app.workspace.detachLeavesOfType(VIEW_TYPE_STUDENT);
		  this.app.workspace.detachLeavesOfType(VIEW_TYPE_GRADESET_SUMMARY);

		  const grades: TFile = await (
			app.fileManager as any
		  ).createNewMarkdownFile(folder, 'CLASS');
	
		  //new NewGradeSetModal(this.app, grades).open();
		  new Dialog(this, "New Gradeset", "Enter class name", "Create", "Cancel", async (str: string) => {

			this.app.vault.append(grades, "#title "+str+'\n');
			this.openGradeSet(folder);

		//   await app.workspace.getLeaf().setViewState({
		// 	type: VIEW_TYPE_GRADEBOX,
		// 	state: { file: grades.path },
		//   });
		}).open();

		  //console.log(app.workspace.getRightLeaf(false).getViewState().state);
		} catch (e) {
		   console.error('Error creating gradeset:', e);
		}
	  }

	  async displayGradeSetView() {
		await app.workspace.getLeaf(true).setViewState({
			type: VIEW_TYPE_GRADESET_SUMMARY,
			state: { gradeset: this.gradeSet },
		});
		this.app.workspace.revealLeaf(
		 	this.app.workspace.getLeavesOfType(VIEW_TYPE_GRADESET_SUMMARY)[0]
		);

	  }

	  async displayStudent(student: Student) {
		console.log("DISPLAY STUDENT: "+student.data.get("name"));
		this.currentStudent = student;

		await app.workspace.getLeaf(true).setViewState({
			type: VIEW_TYPE_STUDENT,
			state: { student: student },
		});
		this.app.workspace.revealLeaf(
		 	this.app.workspace.getLeavesOfType(VIEW_TYPE_STUDENT)[0]
		);

	  }


}

class NewGradeSetModal extends Modal {
	gname: string;
	gradesFile: TFile;

	constructor(app: App, grades: TFile) {
		super(app);
		this.gradesFile = grades;
	}

	onOpen() {
		let {contentEl} = this;
		
		contentEl.createEl("h2", { text: 'New Gradeset' });

		new Setting(contentEl)
		.setName("Gradeset Name")
		.addText((text) =>
		  text
			  .setValue("")
			  .onChange((value) => {	
				this.gname = value;
			  }
            ));

		new Setting(contentEl)
			.addButton((btn) =>
			  btn
				.setButtonText("OK")
				.setCta()
				.onClick(() => {
				  app.vault.append(this.gradesFile, "#title "+this.gname+'\n');
				  this.close();
				
		}));
	}

	onClose() {
		let {contentEl} = this;
		contentEl.empty();
	}

	
}

class GradeBoxSettingsTab extends PluginSettingTab {
	plugin: GradeboxPlugin;

	serviceSetting: Setting;
	hostSetting: Setting;
	portSetting: Setting;
	usernameSetting: Setting;
	passwordSetting: Setting;
	secureSetting: Setting;
	TRMNLpluginID: Setting;

	constructor(app: App, plugin: GradeboxPlugin) {
		super(app, plugin);
		this.plugin = plugin;
	}

	display(): void {
		let {containerEl} = this;

		containerEl.empty();

		containerEl.createEl('h1', {text: 'GradeBox version '+this.plugin.version});
		containerEl.createEl('hr');

		containerEl.createEl('h2', {text: 'General'});

		new Setting(containerEl)
			.setName('Number of recent files')
			.setDesc('This is the number of recent files that will be displayed from the ribbon icon.')
			.addText(text => text.setPlaceholder('#')
				.setValue(this.plugin.settings.numberOfRecentFiles)
				.onChange(async (value) => {
					this.plugin.settings.numberOfRecentFiles = value;
					await this.plugin.saveSettings();
				}));

		new Setting(containerEl)
			.setName('Student Image URL')
			.setDesc('This is the URL for a student who is created without an image.')
			.addText(text => text.setPlaceholder('URL')
				.setValue(this.plugin.settings.url)
				.onChange(async (value) => {
					this.plugin.settings.url = value;
					await this.plugin.saveSettings();
				}));
		
		new Setting(containerEl)
			.setName('Template for Emailing Scores')
			.setDesc('This is the template file used when emailing scores to students.')
			.addText(text => text
				.setValue(this.plugin.settings.template)
				.onChange(async (value) => {
					this.plugin.settings.template = value;
					await this.plugin.saveSettings();
				}));
			
						
		containerEl.createEl('h2', {text: 'Colorizing'});

		new Setting(containerEl)
			.setName('Divider: Top to Middle')
			.setDesc('This is the score that divides the top scores from the middle scores.')
			.addText(text => text.setPlaceholder('#')
				.setValue(this.plugin.settings.colorDivider1)
				.onChange(async (value) => {
					this.plugin.settings.colorDivider1 = value;
					await this.plugin.saveSettings();
				}));

		new Setting(containerEl)
			.setName('Divider: Middle to Bottom')
			.setDesc('This is the score that divides the middle scores from the top scores.')
			.addText(text => text.setPlaceholder('#')
				.setValue(this.plugin.settings.colorDivider2)
				.onChange(async (value) => {
					this.plugin.settings.colorDivider2 = value;
					await this.plugin.saveSettings();
				}));		

		containerEl.createEl('h2', {text: 'Email Server'});

		new Setting(containerEl)
			.setName('Delay between sending messages')
			.setDesc('This is the number of second to wait between sending messages.')
			.addText(text => text.setPlaceholder('#')
				.setValue(this.plugin.settings.delay)
				.onChange(async (value) => {
					this.plugin.settings.delay = value;
					await this.plugin.saveSettings();
				}));

		this.serviceSetting = new Setting(containerEl)
			.setName('Email Service Template')
			.setDesc('To populate settings below')
			.addDropdown(drop => drop
				.addOption("none", "none")
				.onChange(async (value) => {
					const service = services[value];
					if (service["host"] == undefined) {
						(this.hostSetting.components[0] as TextComponent).setValue("");
						this.plugin.settings.smtphost = "";
					} else {
						(this.hostSetting.components[0] as TextComponent).setValue(service["host"]);
						this.plugin.settings.smtphost = service["host"];
					}
					if (service["port"] == undefined) {
						(this.portSetting.components[0] as TextComponent).setValue("");
						this.plugin.settings.smtpport = "";
					} else {
						(this.portSetting.components[0] as TextComponent).setValue(""+service["port"]);
						this.plugin.settings.smtpport = ""+service["port"];
					}
					if (service["secure"] == undefined) {
						(this.secureSetting.components[0] as DropdownComponent).setValue("None");
						this.plugin.settings.secure = "None";
					} else {
						if (service["secure"] == true) {
							(this.secureSetting.components[0] as DropdownComponent).setValue("SSL");
							this.plugin.settings.secure = "SSL";
						} else {
							(this.secureSetting.components[0] as DropdownComponent).setValue("None");
							this.plugin.settings.secure = "None";
						}
					}
					this.plugin.settings.service = value;
					await this.plugin.saveSettings();
				})
			);
		Object.keys(services).forEach(key => {
			(this.serviceSetting.components[0] as DropdownComponent).addOption(key,key);
		});
		(this.serviceSetting.components[0] as DropdownComponent).setValue(this.plugin.settings.service);

		this.hostSetting = new Setting(containerEl)
			.setName('Email Host')
			.setDesc('The server that collects your email')
			.addText(text => text
				.setPlaceholder('smtp.gmail.com')
				.setValue(this.plugin.settings.smtphost)
				.onChange(async (value) => {
					console.log('Email Host: ' + value);
					this.plugin.settings.smtphost = value;
					await this.plugin.saveSettings();
				}));

		this.portSetting = new Setting(containerEl)
			.setName('Email Host Port')
			.setDesc('The port the server uses to collect your email')
			.addText(text => text
				.setPlaceholder('465')
				.setValue(this.plugin.settings.smtpport)
				.onChange(async (value) => {
					console.log('Host Port: ' + value);
					this.plugin.settings.smtpport = value;
					await this.plugin.saveSettings();
				}));
	
		new Setting(containerEl)
			.setName('Does Email Host Need Authentication?')
			.setDesc('Does your email host require a username / password?')
			.addToggle(text => text
				.setValue(this.plugin.settings.useAuthentication)
				.onChange(async (value) => {
					console.log('UseAuth: ' + value);
					this.plugin.settings.useAuthentication = value;
					await this.plugin.saveSettings();

					if (value) {
						this.usernameSetting.setDisabled(false);
						this.passwordSetting.setDisabled(false);
					} else {
						this.usernameSetting.setDisabled(true);
						this.passwordSetting.setDisabled(true);
					}
			}));

		this.usernameSetting = new Setting(containerEl)
			.setName('Username')
			.setDesc('Username provided for host authentication')
			.setDisabled(! this.plugin.settings.useAuthentication)
			.addText(text => text
				.setValue(this.plugin.settings.username)
				.onChange(async (value) => {
					console.log('Username: ' + value);
					this.plugin.settings.username = value;
					await this.plugin.saveSettings();
			}));

		this.passwordSetting = new Setting(containerEl)
			.setName('Password')
			.setDesc('Password provided for host authentication')
			.setDisabled(! this.plugin.settings.useAuthentication)
			.addText(text => text
				.setValue(this.plugin.settings.password)
				.onChange(async (value) => {
					console.log('Password: ' + value);
					this.plugin.settings.password = value;
					await this.plugin.saveSettings();
			}));
		
		this.secureSetting = new Setting(containerEl)
			.setName('Encryption')
			.setDesc('What kind of encryption does the host use?')
			.addDropdown(text => text
				.onChange(async (value) => {
					console.log('Encryption: ' + value);
					this.plugin.settings.encryption = value;
					await this.plugin.saveSettings();
				})
				.addOption("None", "None")
				.addOption("TLS", "TLS")
				.addOption("SSL", "SSL")
				.setValue(this.plugin.settings.encryption)
		);

		containerEl.createEl('h2', {text: 'Email Message'});

		new Setting(containerEl)
		.setName('Sent from')
		.setDesc('Sent from address for pre-filling From field (optional)')
		.addText(text => text
			.setValue(this.plugin.settings.from)
			.onChange(async (value) => {
				console.log('From: ' + value);
				this.plugin.settings.from = value;
				await this.plugin.saveSettings();
		}));

		new Setting(containerEl)
			.setName('Default To: address for emails')
			.setDesc('This is the default destination address for email messages.')
			.addText(text => text.setPlaceholder('Email address')
				.setValue(this.plugin.settings.defaultto)
				.onChange(async (value) => {
					this.plugin.settings.defaultto = value;
					await this.plugin.saveSettings();
				}));

	new Setting(containerEl)
		.setName('Receiver')
		.setDesc('Receiver for pre-filling To field (optional)')
		.addText(text => text
			.setValue(this.plugin.settings.receiver)
			.onChange(async (value) => {
				console.log('Receiver: ' + value);
				this.plugin.settings.receiver = value;
				await this.plugin.saveSettings();
		}));

	new Setting(containerEl)
		.setName('Subject')
		.setDesc('Subject for pre-filling the subject field (optional)')
		.addText(text => text
			.setValue(this.plugin.settings.subject)
			.onChange(async (value) => {
				console.log('Subject: ' + value);
				this.plugin.settings.subject = value;
				await this.plugin.saveSettings();
		}));
		
		containerEl.createEl('h2', {text: 'Grades Web Service'});

		new Setting(containerEl)
			.setName('When to generate Web server file')
			.setDesc('When Web server file is generates.')
			.addDropdown(text => text
				.onChange(async (value) => {
					this.plugin.settings.whenToGenerate = value;
					await this.plugin.saveSettings();
				})
				.addOption("open", "open")
				.addOption("close", "close")
				.addOption("never", "never")
				.setValue(this.plugin.settings.whenToGenerate)
		);

		containerEl.createEl('h2', {text: 'TRMNL Gradeset Display'});

		new Setting(containerEl)
		.setName('Display Gradeset on TRMNL?')
		.setDesc('Whether to use TRMNL to display gradeset.')
		.addToggle(text => text
			.setValue(this.plugin.settings.useTRMNL)
			.onChange(async (value) => {
				this.plugin.settings.useTRMNL = value;
				await this.plugin.saveSettings();

				if (value) {
					this.TRMNLpluginID.setDisabled(false);
				} else {
					this.TRMNLpluginID.setDisabled(true);
				}
		}));

		this.TRMNLpluginID = new Setting(containerEl)
		.setName('TRMNL plugin ID')
		.setDesc('ID of the plugin on the TRMNL web site')
		.setDisabled(! this.plugin.settings.useTRMNL)
		.addText(text => text
			.setValue(this.plugin.settings.TRMNLpluginID)
			.onChange(async (value) => {
				this.plugin.settings.TRMNLpluginID = value;
				await this.plugin.saveSettings();
		}));

	}

	

}
