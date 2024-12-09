import { App, DropdownComponent, Editor, FileSystemAdapter, ItemView, MarkdownFileInfo, MarkdownRenderer, MarkdownView, Menu, MenuItem, Modal, Notice, Platform, Setting, TFile, TFolder, TextFileView, WorkspaceLeaf } from "obsidian";
import { StudentView, VIEW_TYPE_STUDENT } from "StudentView";

export class TRMNL {

    pluginID: string;
    html: string;

    constructor(pluginID: string) {
        this.pluginID = pluginID;
    }

    setHTML(html: string) { 
        this.html = html;
    }

    publish(): boolean {
        return true;
    }
}