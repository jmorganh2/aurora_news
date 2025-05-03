Complete Guide to the “Publish Aurora Article” iOS Shortcut

This guide will walk you through each step to finish building your “Publish Aurora Article” Shortcut for iOS 17+. We will prompt for an article title and body (which you’ve already set up), then generate a slugified filename with the current date, create a Markdown file with YAML front-matter (including a 200-character excerpt), base64-encode the content, and upload it to GitHub via the API. Finally, the shortcut will display the new post’s URL as a success message. Follow the steps below, matching each action’s name and settings exactly as described for the Shortcuts app UI.

1. Generating the Filename from Title and Date (Slugify Title)

First, we’ll create a filename for the new post using the current date and the article title (slugified). Filenames for Jekyll/Pages posts often include the date and a URL-friendly title.
	1.	Get Current Date: Add the “Current Date” action (found under Date & Time). This outputs the current date and time as a Date object (we will use this for both filename and front-matter).
	2.	Format Date (YYYY-MM-DD): Add a “Format Date” action. Set its Date input to the Current Date (magic variable from the previous step). In Format, choose Custom and enter yyyy-MM-dd (this will produce a date string like 2025-05-02). This formatted date string will prefix the filename.
	3.	Slugify the Title: We’ll convert the title text into a URL-friendly slug:
	•	Add a “Change Case” action (from the Text category) and set it to Lowercase. Use the Article Title (from your first prompt) as the input. This outputs the title in all-lowercase (e.g. "My First Post" → "my first post").
	•	Add a “Replace Text” action. Set Find to a space ( ) and Replace to - (a hyphen). Input should be the lowercased title from the previous step. This replaces spaces with hyphens (e.g. "my first post" → "my-first-post").
	•	Still in the Replace Text action, tap Show More and enable Regular Expression. Change the Find pattern to [^a-z0-9-] and leave Replace blank. This regex will remove any character that is not a lowercase letter, number, or hyphen (stripping out punctuation and special characters from the slug). For example, "hello & world!" would become "hello-world".
	•	The result of these text transformations is your slugified title. (You can add a Set Variable action here to store it as Slug for clarity, or rename the Magic Variable output to “Slug.”)
	4.	Combine Date and Slug for Filename: Now construct the filename by combining the date and slug:
	•	Add a “Text” action. In the text field, insert the Formatted Date (from step 2), then type a hyphen (-), then insert the Slug variable, and finally add the extension .md. For example, it should end up looking like: 2025-05-02-my-first-post.md.
	•	This Text action’s output is the Filename for the new post. (You may Set Variable to store it as Filename if you like, or remember to use this Text output as the filename variable later.)

2. Creating the YAML Front Matter and Combining with the Body

Next, we’ll prepare the YAML front matter that goes at the top of the Markdown file, and then append the article body below it. The front matter will include the title, date, and (after the next step) an excerpt.
	1.	Format Date for Front Matter: Add another “Format Date” action. Set the Date to the Current Date (from step 1) and choose a format that includes date and time. For example, set Format to Custom and use yyyy-MM-dd HH:mm:ss (which yields a timestamp like 2025-05-02 20:02:20). This will be used in the front matter so your post has a timestamp. (If your site requires a specific date format or timezone offset in front matter, adjust the format accordingly.)
	2.	Build Front Matter Text: Add a “Text” action that will contain the YAML front matter and the article body. In the text field, type the three dashes --- on the first line to begin the YAML block. On the next lines, enter the YAML fields:
	•	title:  then insert the Article Title variable (the original title text the user provided).
	•	date:  then insert the Formatted Date from the previous step (this includes the time).
	•	We will add excerpt:  in a moment (after creating the excerpt in the next step).
	•	Finally, type --- on a new line to end the YAML section. Press Return twice to add a blank line after the --- (this ensures a blank line between YAML and body).
	•	After the blank line, insert the Article Body variable (the Markdown content from your second prompt).
At this point, your Text action should look like a template, for example:

---
title: My First Post
date: 2025-05-02 20:02:20
excerpt: (to be added)
---

Lorem ipsum dolor sit amet, ... (rest of article body)

Don’t worry, we will fill in the excerpt field next. For now, the front matter has title and date filled in, and the body text appended after the YAML.

Note: Make sure the Article Body insertion in the Text action comes after the closing --- and a blank line. This ensures the body text will be separated from the YAML front matter when the file is created.

3. Creating a Short Excerpt (first 200 characters)

Many blogs use an excerpt for previews. We’ll generate an excerpt automatically by taking the first 200 characters of the article body. We can do this with a regex match in Shortcuts:

Example: The Match Text action configured to capture the first 6 characters of a text (for demonstration). In your shortcut, use 200 to capture the first 200 characters as the excerpt.
	1.	Match First 200 Characters: Add a “Match Text” action (from the Text category). Set it to use a Regular Expression (toggle on “Regular Expression” in Show More). In the pattern field, enter:

^.{0,200}

This regex pattern matches from the start of the text (^) up to 200 characters (.{0,200} means 0 to 200 of any character). For Input, provide the Article Body text. This action will output the first 200 characters of the body.

	2.	Retrieve the Matched Text: The output of Match Text will be a list containing the matched substring (the excerpt). In most cases it returns a single match – the first 200 characters. To use it easily, you can treat that as the excerpt text. (Shortcuts may directly give you the matched string as output, or you can get the first item of the Matches if needed via Get Item from List with index 1.)
	•	Optional: Use a Set Variable action to store this output as Excerpt for clarity.
	3.	Insert Excerpt into Front Matter: Now, go back to the Text action from Step 2 where we left an excerpt: line. Edit that action to insert the Excerpt variable you just captured:
	•	In the Text action, find the excerpt:  line. After the space, insert the Excerpt variable (from the Match Text result). This will place the first 200 characters of the body into the YAML front matter.
	•	The front matter in that Text action should now look like:
excerpt: Lorem ipsum dolor sit amet... (up to 200 characters of your article body).

At this point, the Text action from Step 2 now contains the complete Markdown content: it has the YAML front matter (with title, date, and excerpt) followed by the full article body. The output of that action is the full post content in Markdown format. For clarity, you can Set Variable to store this output as Full Content (or simply remember to use the Text action’s output as the full content).

4. Encoding the Full Markdown Content as Base64

GitHub’s API requires the file content to be sent as a Base64-encoded string ￼. We need to encode our Markdown text (with front matter) to Base64 before sending. There isn’t a built-in “Base64 encode” in Shortcuts by default, but we can achieve it with an external action or app:
	•	Base64 Encode Action: If you have the third-party app Toolbox Pro (which extends Shortcuts), add the “Base64 Encode” action from Toolbox Pro. Set its input to the Full Content text from step 3. This will output the Base64-encoded text of the entire Markdown file.
	•	If you don’t have Toolbox Pro, you can use another method or shortcut to encode Base64. (For example, some community shortcuts or scripting apps like Scriptable can do Base64 encoding.) The key is to produce a text string that is the Base64 representation of the file content.
	•	Store Base64 Content: Use a Set Variable to save the encoded text as Base64Content (unless the Base64 Encode action already names its output). We will need this string for the API request.

Note: Ensure that the Base64 string has no extra newlines or characters. It should be a continuous string of Base64 characters. (The Toolbox Pro action handles this correctly.)

5. Creating the JSON Request Body for GitHub

Now we’ll prepare a JSON dictionary with all the information needed by GitHub’s “Create/Update file” API endpoint. The JSON will include the commit message, the Base64 content, and the target branch.
	1.	Prepare a Commit Message: It’s good practice to include a commit message for the file upload. You can make this dynamic with the title. For example, add a “Text” action that says something like: Add new post:  and then insert the Article Title variable. This will produce a message like “Add new post: My First Post”. (Alternatively, you can just use a fixed message like "Publish new article" – up to you.) Save or remember this as Commit Message.
	2.	Create Dictionary: Add a “Dictionary” action (from Scripting). We will add the following keys and values to it:
	•	Key: message – Value: the Commit Message text from the previous step (e.g. "Add new post: My First Post").
	•	Key: content – Value: the Base64Content string (the output from step 4). This is the core file content in Base64.
	•	Key: branch – Value: the name of the branch where your Pages site files reside (usually "main" or "master" for user sites, or possibly "gh-pages" for project sites if that’s where the Pages are published). For example, use "main" if you are unsure (that’s the default for GitHub Pages now).
	•	(You do not need to include a path here since the path will be specified in the URL. Also, since we are creating a new file, we do not include a sha. GitHub will create the file; if a file with the same name exists, the request will fail unless you provide the sha of the existing file for an update.)
	3.	The Dictionary action should now have three entries: message, content, and branch, with their respective values. This will be automatically converted to JSON when we make the request (Shortcuts will handle the encoding since we’ll specify JSON in the request).

6. Fetching the GitHub Token Securely from Keychain

To authenticate to the GitHub API, we need a Personal Access Token (PAT) stored securely. You mentioned using the iOS Keychain for this, which is ideal so you’re not hard-coding the token in the shortcut.
	1.	Store Token in Keychain (one-time setup): If you haven’t already, save your GitHub PAT in the iOS Passwords (Keychain). The easiest way is to create a new entry in Settings > Passwords. For example, use a fake website or identifier like api.github.com or GitHub Token:
	•	Website: api.github.com (or any label you prefer)
	•	Username: (you can put something like GitHub PAT or leave it blank)
	•	Password: (your personal access token string)
	•	Save this password item. Now your token is securely in the system Keychain.
	2.	Find Password in Shortcut: In Shortcuts, add the “Find Passwords” action (it may appear as “Find [Login] Passwords” under the Passwords category). Configure the filter to locate the entry you created:
	•	e.g. Service contains api.github.com OR Account (username) contains GitHub PAT – whichever identifier you used.
	•	This action will search your iCloud Keychain and return matching password item(s). If you set it up uniquely, it should find exactly one result – your GitHub token entry.
	3.	Get the Token from the Password item: The result from Find Passwords is a Password item with fields (service, username, password). We need the actual password (the token). Shortcuts allows you to extract it:
	•	Add a “Get Details of Password” action (if available) and select Password as the detail to get from the found item. Set the Password item from the previous step as the input.
	•	Alternatively, you can directly use the Magic Variable from Find Passwords: tap its magic variable and you’ll see sub-values like “Password”. Choose Password and Shortcuts will treat that as the token text.
	•	After this step, you have the token as a Text value. Use Set Variable to store it as GitHubToken for clarity. (This variable should contain the actual token string.)
	4.	Privacy Note: The first time this runs, Shortcuts will likely prompt you to allow access to the Passwords item (Face ID/Touch ID or passcode). Grant access so it can retrieve the token. The token remains secure in Keychain and is not hardcoded in the shortcut.

7. Sending a PUT Request to GitHub’s REST API (Creating/Committing the file)

Now comes the step that actually uploads the file to GitHub. We will use the “Get Contents of URL” action to call GitHub’s REST API for repository contents. Despite its name, this action can also send POST/PUT requests.
	1.	Get Contents of URL: Add a “Get Contents of URL” action (under Web or search for URL). Tap Show More on this action to reveal additional options. We will configure:
	•	Method: Select PUT (since we are creating or updating a file on the server).
	•	URL: This needs to be the GitHub API endpoint for creating a file in your repo. The format is:

https://api.github.com/repos/USERNAME/REPO/contents/PATH/TO/FILE

Use your GitHub username (or org name) in place of USERNAME, your repository name in place of REPO, and the path where you want to save the file. For a user Pages repo (username.github.io), the repository is likely your username.github.io and the content might go in the root or _posts folder. For example, if your site stores posts in a _posts directory, your URL might look like:
https://api.github.com/repos/YourUser/youruser.github.io/contents/_posts/
then append the Filename variable from step 1.
	•	You can construct this by typing the URL up to the folder, then tapping the Filename variable to insert it. The final URL might be, for example:
https://api.github.com/repos/YourUser/youruser.github.io/contents/_posts/2025-05-02-my-first-post.md
(If your repo is a project pages site, include the correct repo name and path. If not using a folder, just put the file at contents/ root.)

	•	Headers: We need to add two headers:
	•	Tap Add new header and set Key to Content-Type and Value to application/json. This tells GitHub we’re sending JSON data.
	•	Tap Add new header again. Set Key to Authorization and Value to token  followed by your GitHubToken variable. To do this, type token  (with a space after it) in the value field, then tap to insert the GitHubToken (the PAT from step 6). It should read like token abc123... (with your token in place of abc123...). This header authenticates you to the API.
	•	Request Body: Change the request body type to JSON (you’ll see options JSON / Form / File; choose JSON). For the content of the body, use the Dictionary from step 5 (the commit message/content/branch dictionary). You can do this by tapping Select Magic Variable in the Request Body field and picking the Dictionary. Shortcuts will serialize this dictionary to JSON when sending the request.

	2.	Execute the Request: When this action runs, it will send a PUT request to GitHub. If everything is correct, GitHub will respond with a JSON containing the file info and commit info. (If the file didn’t exist, this creates it with your commit message. If it did exist and you didn’t provide a sha, GitHub will error out to prevent overwriting – this ensures you don’t accidentally overwrite an existing post.)
	•	For debugging: You can use a Show Result action here to see the response from GitHub if needed. A successful response has status 201 Created and includes a JSON with the file’s content and commit. You might not need to do anything with this in the shortcut, as it’s mainly confirmation.

Make sure all parts of the Get Contents of URL action are filled in correctly: Method = PUT, the URL with your repo/filename, both Headers set (Authorization and Content-Type), and Request Body set to the JSON dictionary. This is the core step that pushes your article to the repository.

8. Showing the New Post URL as a Success Message

Finally, after uploading, you want to present the URL where the article can be viewed on your GitHub Pages site. This will likely be your GitHub Pages URL plus a path derived from the date and slug.

To construct the post’s URL, you need to know your site’s base URL and how posts’ URLs are structured:
	•	Base URL: For user/organization pages, this is usually https://<username>.github.io/ (for example, https://youruser.github.io/). For a project site, it might be https://<username>.github.io/<repo>/. If you have a custom domain, use that (e.g. https://www.yourcustomdomain.com/). You likely know this base part.
	•	Post path: By default, Jekyll uses the date and title for the permalink. If you haven’t changed the defaults, the URL will include the date and the slug. Common default format is: /YEAR/MONTH/DAY/slug.html (if using “date” permalink with .html at the end) or /YEAR/MONTH/DAY/slug/ (if using “pretty” permalinks with no .html). We will assume the default case with .html for now – adjust if your _config.yml uses a different structure.

Here’s how to build and show the URL in Shortcuts:
	1.	Format Date for URL: Add another “Format Date” action. Use the same Current Date from step 1 as input. Set Format to Custom and enter yyyy/MM/dd (with slashes). This will output the date as 2025/05/02 for example. (Using the same date as the filename ensures the URL date matches the file date. Alternatively, you could reuse the formatted date from step 2 and just replace hyphens with slashes via a Replace Text action.)
	2.	Compose URL Text: Add a “Text” action to construct the full URL. In the text field:
	•	Type your site’s base URL, e.g. https://youruser.github.io/ (include the trailing slash).
	•	Insert the Formatted Date from the previous step (this gives 2025/05/02).
	•	Type a / after the date.
	•	Insert the Slug (from step 1, the title part of filename without date).
	•	Finally, add .html at the end (if your site uses .html in URLs; if your site is configured for extensionless pretty URLs, you can omit the “.html” or add a trailing slash instead). For example, the text might become:
https://youruser.github.io/2025/05/02/my-first-post.html
	•	The output of this Text action is the Post URL.
	3.	Show Alert/Notification: Add a “Show Alert” action (from Scripting) to display the result. Set Title to something like “✅ Article Published” (to indicate success). For the Message, insert the Post URL text from the previous step. You can enable Copy to Clipboard in the alert if you want to easily copy the URL. The alert will show the URL and an “OK” button.
	•	Alternative: You could use “Show Notification” instead to silently display the URL in a banner, or even “Open URLs” to immediately launch the link in a browser. But an alert is a clear way to confirm success and show the link.
	4.	(Optional) Open the URL: If you want the shortcut to immediately open the new post in browser, you can follow the alert with an “Open URLs” action, feeding it the Post URL. This will launch Safari (or your default browser) to that address when you tap OK on the alert.

That’s it! Now let’s recap the overall flow in order, ensuring each action is properly configured:
	•	Ask for Input (Text) – “Article Title” (✅ already set up by you).
	•	Ask for Input (Text) – “Article Body (Markdown)” (✅ already set up by you).
	•	Current Date – (no special configuration; provides current date/time).
	•	Format Date – Format: yyyy-MM-dd → outputs date string for filename.
	•	Change Case – Lowercase the Title.
	•	Replace Text – Spaces → “-” in lowercased title.
	•	Replace Text (Regex on) – Pattern [^a-z0-9-] → Replace with nothing (remove non-url-safe chars).
	•	Text – FormattedDate-slug.md → outputs Filename.
	•	Format Date – Format: yyyy-MM-dd HH:mm:ss → outputs timestamp for front matter.
	•	Match Text – Regex ^.{0,200} on Article Body → outputs Excerpt.
	•	Text – YAML front matter (title, date, excerpt) + blank line + Article Body → outputs Full Content. (Make sure excerpt variable from Match Text is inserted here.)
	•	Base64 Encode (Toolbox Pro or other) – input Full Content → outputs Base64Content.
	•	Text – “Add new post: [Title]” → outputs Commit Message.
	•	Dictionary – Keys: message (Commit Message), content (Base64Content), branch (e.g. “main”).
	•	Find Passwords – filter to your GitHub token entry → outputs Password item.
	•	Get Details of Password – Password from item → outputs token text.
	•	Get Contents of URL – Method PUT, URL (GitHub API with repo path and Filename), Headers: Content-Type application/json, Authorization token [GitHubToken], Request Body (JSON Dictionary).
	•	Show Alert – “Article Published” with message Post URL (constructed from base URL + date + slug + .html).

Configuring the Get Contents of URL action: Ensure Method is PUT, the URL is your repo’s content endpoint including the filename, Headers include “Content-Type: application/json” and “Authorization: token ”, and the Request Body is set to the JSON dictionary. (The screenshot shows an example with POST and JSON header – in your case select PUT and include the Authorization token header.)

With all the above in place, run your shortcut. It will prompt for the title and body, then perform the steps. On success, you should get an alert with the URL of your new blog post. 🎉

You can now tap the URL (if using a notification or directly opening it) or copy it from the alert to verify that your article is live on your GitHub Pages site. Each subsequent run of the shortcut will publish a new Markdown file to your repo and give you the link.

Troubleshooting tips: If the shortcut fails at the Get Contents of URL step, use a Show Result on that step’s output or add a Quick Look to see the error message. Common issues could be an incorrect repo path, an authentication error (check that your token is correct and has repo access), or forgetting to Base64 encode (the API will complain about invalid content if not encoded). Make sure the token has the “repo” scope if it’s a classic PAT, or appropriate content permissions if it’s a fine-grained PAT.

Once everything is set up as above, you’ll have a one-tap Shortcut to publish Markdown articles to GitHub Pages with ease. Good luck with your Shortcut, and enjoy your streamlined blogging workflow!