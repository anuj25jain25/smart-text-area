# Smart Text Area

Smart Text Area is a React App for handelling different commands within the text area. User can also create custom commands to full fill their requirements.

## Installation

Use the package manager [NPM](https://nodejs.org/en/) to install Smart Text Area dependencies.

```bash
npm install
```

## Usage

Following command will start hosting the App on local server at PORT - 3000 by default
```bash
npm start
```

## Examples

| Input                     | Output                                       |
| ------------------------- | -------------------------------------------- |
| Hello World /upper        | Hello WORLD                                  |
| Sum for 2 + 5 is /add 2 5 | Sum for 2 + 5 is 7                           |
| /addCommand               | this command will open create command pop-up |


## Project Plan

### Requirements
- Slash command should return desired output with in the text area
- "/addCommand" should open a pop-up to create new command.

### Assumptions
- Command written after slash is already defined otherwise it behave like a normal text.
- Pressing "Enter" or "Space" key after the command is completed will return the correct output within the text area.
- While creating a command, the dedicated function will receive at least one argument in which first argument will always contain the value of the text area except the command line text.
- While creating a command if text written after the command is required to be used inside that command dedicated function then those values are required to be pass as extra parameters to that function.

## Limitations
- Pasting any website attack script inside the function where command is created, might run attack on the website, this can be fixed later by analysing the text written inside the function and removing any malicious code after detecting any such script.
- Copy pasting command with slash into the textarea won't make it a command, it will continue working as a normal text. This can fixed later my improving the change detectors of textarea.