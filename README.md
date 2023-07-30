
# VueUIComponents

Every frontend projects at Ceedlab has its UIComponents packaged as a NPM package. The purpose is to achieve a micro-frontend development strategy which simplifies the maintenance process and makes it easily for team members to collaborate on a single product without conflits. 

UI component packages are built out of the design system provider by the UI/UX team for a particular product and can you used across multiple verticals or domain of the product.

## How to use

The goal of this repository is for it to be use as a template for new UIComponents packages. 

To start clone this repository

```
git clone https://drayfocus1@bitbucket.org/cc-portfolio/vueuicomponents.git
```

Update the `git remote origin url` with your package repository.

```
git remote set-url origin {your_package_repo_url}
```

Update the package name in the `package.json` file to your package name.

```
{
  "name": "{app_name}/ui-components",
  "version": "0.0.1",
  "description": "UI components for {App name}",
  "author": "",
  ...

}
```

Install the package dependencies

```
npm install
```

To build the package 

```
npm run build
```

To enable tailwindCSS to watch file changes

```
npm run build:style:watch
```

To publish to Ceedlab private repo

```
npm publish --registry=https://npm-registry.ceedcap.io/
```

> Before attempting to publish a package, ensure you don't have not uncommited files by running `git commit add .` and you have updated the package version using `npm version patch`.

## Folder structure

This repository is a template for creating new UIComponents packages and it uses some common folder structure in most Javascript packages to structure it content. I should mention that this package is written in Typescript.

### The root dir

This contains basic Typescript project files like `package.json`, `tsconfig.json`, e.t.c. This package uses TailwindCSS for styling and Webpack for code compilation. You can customize TailwindCSS in the `tailwind.config.js` file and Webpack in the `webpack.config.js` file.

### The src/ dir 

This folder contains all the package code files. It has 5 folder. `assets`, `components`, `composable`, `styles`, and `types`. 

**The assets folder**

This folder contains extra assets files like external JSON or JS script you like would like to use in the package.

**The components folder**

This is where all the VueJs components sits. Each components resides in a Folder similar to it's name e.g `AppButton` and it has at least `index.vue` and `index.ts` files in it. The `index.vue` file hold the VueJs code and the `index.ts` file exports the component for external usage. Here is an example below.

```
// src/components/AppButton/index.vue

<template>
  <button
    :class="`focus:outline-none shadow-sm rounded flex flex-row space-x-1 items-center justify-center ${padding} ${bgColor} ${textColor} ${customClass}`"
  >
    <slot />
  </button>
</template>
<script lang="ts">
import { defineComponent } from "vue";
export default defineComponent({
  props: {
    bgColor: {
      type: String,
      default: "bg-primaryBlack",
    },
    textColor: {
      type: String,
      default: "text-white",
    },
    customClass: {
      type: String,
      default: "",
    },
    padding: {
      type: String,
      default: "py-2 px-4 ",
    },
  },
  name: "AppButton",
});
</script>
```

```
// src/components/AppButton/index.ts

import AppButton from './index.vue'

export default AppButton

```

In some cases, a component folder migth contain multiple VueJs components, you can export them in the `index.ts` file like the example below.

```
// src/components/AppForm/index.ts

import AppSelect from './select.vue'
import AppTextField from './textField.vue'
import AppCheckbox from './checkbox.vue'
import AppOtpInput from './otpInput.vue'
import AppKeyboard from './keyboard.vue'
import AppRadio from './radio.vue'
import AppFormWrapper from './wrapper.vue'
import AppFileAttachment from './fileAttachment.vue'

export {
  AppSelect,
  AppTextField,
  AppCheckbox,
  AppOtpInput,
  AppKeyboard,
  AppRadio,
  AppFormWrapper,
  AppFileAttachment,
}

```

**The composable folder**

This folder is where all the UI focused frontend logics sits. It has a default `index.ts` folder with a basic code that allows you to set a the App `FrontendLogic` the UI component would use. To learn more about App `FrontendLogic` package, check this repository.

```
// src/composable/index.ts

export let Logic: any = undefined;

export const SetFrontendLogic = (logic: any) => {
    Logic = logic;
}
```

If the `FrontendLogic` is set, you can use the code in the `FrontendLogic` directly within the package.

**The styles folder**

As it's name implies, the folder hold  files that handles every thing styling in the package. It has a default `index.css` with contain the default tailwindCSS setup.

**The types folder**

This folder holds all the Typescript type interface use by the VueJs components. It has an `index.ts` file with some sample type interface

```
// src/types/index.ts

export interface SelectOption {
  key: any
  value: string
  extras?: string
  hasIcon?: boolean
  isImage?: boolean
  isString?: boolean
}

export interface FormRule {
  type:
    | 'isRequired'
    | 'isGreaterThan'
    | 'isLessThan'
    | 'isEqualsTo'
    | 'isGreaterThanOrEqualsTo'
    | 'isLessThanOrEqualsTo'
    | 'isRegex'
    | 'isCondition'
  value: any | undefined
  errorMessage: string | undefined
}
```

**The package export point**

All the code in this package is exported in the `src/index.ts` file for usage. 

```
import { App } from 'vue'

import * as components from './components'

const AppUI = {
  install(app: App) {
    // Auto import all components
    for (const componentKey in components) {
      app.use((components as any)[componentKey])
    }
  },
}

export default AppUI

// export all components as vue plugin
export * from './components'

// export SetFrontendLogic

export * from './composable'
```