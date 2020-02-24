# Contributions Rules

## Git flow

When develop the products, you should follow this work flow, ensure code quality.

### Production (Release branch)

- Branch :
  `master`
- Description :
  The release branch.

### Stage (QA & QE Test Branch)

- Branch :
  `stage`
- Description :
  The pre-release version of products, can let internal team to test.

### Testing

- Branch :
  `testing`
- Description :
  The same environment as `stage` branch, can let engineer test some formal environment's problem.

### Dev

- Branch :
  `dev`
- Description :
  The latest code will be saved into this branch, and all the team member's develop branch will merge into this branch to sync project state.

### PR Example

#### Product

`All develops` > `dev` > `stage` > `production`

#### Test

`All develops` > `dev` > `testing`

## Commit Message

This is the important commit rule for this project, please follow the rules to ensure whole team can trace files easily.

### **Route Head**

Prefix category, it's necessary for commit message

#### Head: [Feature]

- PreFix :
  `feat:`
- Rule :
  New feature for this commit

#### Head: [Performance]

- PreFix :
  `perf:`
- Rule :
  Update some UI/UX, or some performance issue, can create

#### Head: [Bug Fixed]

- PreFix :
  `fix:`
- Rule :
  All unexpected the behavior or error will fixed by this comment

#### Head: [Process]

- PreFix :
  `process:`
- Rule :
  Emergency commit, just like save file

### **Sub Route**

For separate feature develop, or identification of major categories

#### Sub: [Feature]

- Rule :
  Feature or category

### **Third Route**

Describe something about this commit. You can supplementary some note here

#### Third: [Description]

- Rule :
  Descriptions

### **Example**

If you have two or more update in one commit, please separate with `;`

```bash
- feat: [Login Page] Add login page
- fix: [Login Page] Fixed the abnormal login behavior
- perf: [Dashboard Link] Update dashboard output flow
- feat: [Router Controller] Add router control; perf: [I18n Table] Add lang "US";
```
