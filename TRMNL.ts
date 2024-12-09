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

    publish(extrastuff: string): boolean {
        let url = "https://usetrmnl.com/api/custom_plugins/"+this.pluginID;
        let variables = {"merge_variables": {"clsss": extrastuff, "html": this.html }}
        fetch(url, {
            method: "POST", 
            body: JSON.stringify(variables),
            headers: {
                "Content-type": "application/json; charset=UTF-8"
            }
        })
            .then(response => response.text())
            .then(html => {
                // Do something with the HTML content
                console.log(html); 
            })
        .catch(error => {
            console.error('Error fetching HTML:', error);
        });

        return true;
    }
}