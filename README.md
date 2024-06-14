# Tw-attack-planner v0.1.2-beta

This repository contains an in-game attack planner for Tribal Wars. With this script you can easily plan your arma assignments within a few minutes. It features automatic assignments and calculation based on distance and troop templates. It can handle 1000+ villages and targets.

>  **This script is currently in beta version it may contain critical or minor bugs and glitches**

>  Feel free to use the script, but i do not take any responsibility for in-game Ban's

## Features

- Loading villages from in-game groups
- Parsing and loading village and world infos from Tribal Wars API
- Creating attack templates
- Addition of multiple arrival date
- Assigning attacks by hand with an easy to use UI
- Autoassingment based on templates
- Ordering villages by multiple property
- Storing/saving multiple attack plans
- Setting up player and village support boosters
- Calculating attacks with a single click
- Generating BB-code (for notes) attack plan based on assignments
- Generating troop autofill launch links
- Multilanguage UI based on Browser language

## Guide

### 1. Loading the script

>  **This script is currently counts as illegal (not published on any forums yet)**

To load the script you have to copy the content of the **dist/bundle.js** into the browser terminal.
Or you could use the raw github file as a reference and enter it into your quick bar or terminal:

```js
$.get("https://raw.githubusercontent.com/KincsesBence/TW-attack-planner/main/dist/bundle.js", (r) => { Function(`${r}`)();}); void(0);
```

### 2. Startup window

On the startup window you can load, create and delete your attack plans. When you're creating a new plan, first you have to navigate through, the creation wizard's steps:

- Naming your plan (you can not have duplicate names)
- Adding the targets (you have to paste cordinates into the textarea in a recognizable pattern)
- Choosing the ingame launcher groups (you can add multiple, it creates a union of the villages)
- Adding arrivals (you can add multiple arrival dates)
- Creating templates (you can add multiple templates. template values can hold negative numbers)

### 3. Main window

After you've created or loaded a plan, you will encounter the main planning window:

- On the left you can see the target list, and on the right the launch
villages list. By cheking the boxes in front of the launch villages
and selecting a target by a radio button, you can assign attacks to
the target via clicking the arrow pointing to the left.

- you can order the villages by clicking the icons and the buttons on the header.
- you can filter the villages by name via typing into the search field
- on the target list you can remove assingments via clicking the X button
- and you can remove target and reset their launchers via clicking the X on the target's drop down element
- you can add defender's speed booster on the target with the + button defined in percent
- you can remove the defender's speed booster on the target with the - button

On the far left side you can use the options menu:

- rename the attack plan by clicking the pen icon
- edit the targets
- edit the arrivals
- edit the templates
- edit the defender's speed boosters on the player level
- open the automatic attack assigment modal
- calculate the assigned attacks
- reset the assigned villages