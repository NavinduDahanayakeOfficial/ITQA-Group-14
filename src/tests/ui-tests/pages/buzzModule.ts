import { Locator, Page } from "playwright";
import { BasePage } from "./base.page";
import { Logger } from "../../../utils/logger";
import { expect } from "playwright/test";

export class BuzzModule extends BasePage {
    readonly textArea: Locator;
    readonly postButton: Locator;
    readonly postedText: Locator;
    readonly selectOptionsButton: Locator;
    readonly deleteButton: Locator;
    readonly confirmButton: Locator;
    readonly deletedToast: Locator;
    readonly editButton: Locator;
    readonly editPostTextArea: Locator;
    readonly editPostButton: Locator;
    readonly editedToast: Locator;

    constructor(page: Page) {
        super(page);
        this.textArea = this.page.locator(
            "//div[@class='oxd-buzz-post oxd-buzz-post--active']//textarea[1]"
        );
        this.postButton = this.page.locator(
            "//div[@class='oxd-buzz-post-slot']//button[1]"
        );
        this.postedText = this.page.locator(
            "(//div[@class='orangehrm-buzz-post-body']//p)[1]"
        );
        this.selectOptionsButton = this.page.locator(
            "(//button[@class='oxd-icon-button']//i)[2]"
        );    
        this.deleteButton = this.page.locator(
            "//ul[@class='oxd-dropdown-menu']//li[1]"
        );
        this.confirmButton = this.page.locator(
            "//button[contains(.,'Yes, Delete')]"
        );
        this.deletedToast = this.page.locator(
            "//p[text()='Successfully Deleted']"
        );
        this.editButton = this.page.locator(
            "(//ul[@class='oxd-dropdown-menu']//li)[2]"
        );
        this.editPostTextArea = this.page.locator(
            "(//textarea[@rows='1'])[2]"
        );
        this.editPostButton = this.page.locator(
            "(//button[@type='submit'])[2]"
        );
        this.editedToast = this.page.locator(
            "//p[text()='Success']/following-sibling::p"
        );
    }

    async enterPostText(postText: string) {
        await this.page.waitForTimeout(1000);
        await this.textArea.fill(postText);
    }
    async clickPostButton() {
        await this.page.waitForTimeout(2000);
        await this.click(this.postButton, 'Post Button');
    }
    async verifyPostText(postText: string) {
        await this.page.waitForTimeout(3000);
        const post = await this.postedText.textContent();
        Logger.info(`Post Text: ${post}`);
        expect(post).toContain(postText);
    }
    async clickSelectOptionsButton() {
        await this.click(this.selectOptionsButton, 'Drop Down Button');
    }
    async clickDeleteButton() {
        await this.page.waitForTimeout(2000);
        await this.click(this.deleteButton, 'Delete Button');
    }
    async clickConfirmButton() {
        await this.page.waitForTimeout(2000);
        await this.click(this.confirmButton, 'Confirm Button');
        await this.page.waitForTimeout(1000);
    }
    async verifyPostDeleted() {
        const deleted = await this.deletedToast.textContent();
        Logger.info(`Deleted Toast: ${deleted}`);
        expect(deleted).toContain('Successfully Deleted');
    }
    async clickEditButton() {
        await this.click(this.editButton, 'Edit Button');
    }
    async enterEditPostText(postText: string) {
        await this.page.waitForTimeout(1000);
        await this.editPostTextArea.fill(postText);
    }
    async clickEditPostButton() {
        await this.page.waitForTimeout(2000);
        await this.click(this.editPostButton, 'Edit Post Button');
    }
    async verifyPostEdited() {
        const edited = await this.editedToast.textContent();
        Logger.info(`Edited Toast: ${edited}`);
        expect(edited).toContain('Successfully Updated');
    }
};