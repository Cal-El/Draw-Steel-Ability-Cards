
export type Change = {
  releaseDate: Date,
  type: 'Feature' | 'Fix',
  version: string,
  title?: string,
  changes: string,
}

export const changelog : Change[] = [
  {
    releaseDate: new Date("2025-11-04T03:30:00Z"),
    type: 'Fix',
    version: 'v1.1.1a',
    changes: `
- Add missing level 2 Fury cards from card database
- Replace "Bleed for printing" with "Square corners" and add "Prepare for professional printing" variant
  - This new variant will make the print with **CTRL/CMD + P** work better by default with professional printers
  - It adds proper bleed around the card of 0.125in
  - It adds 1 pixel crop-marks
  - It sets the page size to be 1 card per page, each 3.875in x 2.875in
- There is a **known bug** where switching to the professional printing variant changes the CMD+P functionality semi-permanently
  - Fix this by changing the variant back to another option and refresh the page
      `,
  },
  {
    releaseDate: new Date("2025-09-30T04:20:00Z"),
    type: 'Feature',
    version: 'v1.1.1',
    title: 'Card Style Variant Options and Print Improvements',
    changes: `
- Fixed haloing of new card design that was caused by bleeding fill colour outside outline
- Updated new card design to use 3mm radius on rounded corners, to match print industry standards
- Added card variants, allowing minor alterations in a card design
  - **All rounded corners**: The new card design has a stylish flair with some 45 degree straight-cut corners; for those who want the corners to be consistently rounded, this option will make all corners have a 3mm rounding.
  - **Add bleed for printing**: This option will fill in the corners completely with the primary colour, meaning your corner-cutting won't show and white. This variant will also add a near-matching coloured border around the cards when you print with Ctrl+P, giving a bigger margin for error when cutting out cards.
- Card variants can be accessed via the Themes menu
- I have added cardbacks to the public png files for the site
  - [Single cardback with bleed corners](https://cards.heroic.tools/ds-cardback-v2_bleed.png)
  - [3x3 A4 layout of cardbacks with bleed corners and outlines](https://cards.heroic.tools/ds-cardback-v2-A4_bleed.png)
  - [2x4 US Letter layout of cardback with bleed corners and outlines](https://cards.heroic.tools/ds-cardback-v2-USLetter_bleed.png)
      `,
  },
  {
    releaseDate: new Date("2025-09-29T03:55:00Z"),
    type: 'Feature',
    version: 'v1.1',
    title: `New Card Design and Card Themes added!`,
    changes: `
#### New Card Design
This change includes a new **default** card design. This design aims to more closely match the presentation of abilities in the Draw Steel Heroes book and includes much more explicit calling out of customisable values that are modified by player progression or kits.  
The new card design uses separate font-size overrides from the legacy design, so existing cards will need to be updated to fit the text.

If you don't like the new card design or if you have a game tonight and need to fix the cards to the old style, use the **Theme** menu to change it to "Legacy".

#### Changes to Server-library cards
  - All server cards have been updated to include font overrides for the new card design, where needed
  - All server cards now have subclass noted in the top matter if applicable (domains are treated as a subclass)
  
#### Edit card menu changes
We've added a "Reset" button to allow a card to be reset to server default, to easily fix existing cards. This is based on a match of card title, so if the name has been changed, the button will be unavailable.

#### Themes
The website now has a globally applied "theme" for all cards, and all card lists.
A new "Theme" menu that allows the card design to be changed via in-built themes. You'll notice some locked or superfluous UI in this menu; in future you will be able to duplicate an existing theme and make changes to it, allowing colour customisation for your cards.

In-built themes include:
- **Legacy** (the previous default card design)
- **Draw Steel Ability Cards** (the new default card design)
- **DS Cards Neon Dark** (a colour variant theme of the default card design, with neon colours and dark cardback)
- **DS Cards Greyscale** (a colour variant theme of the default card design, with consistently grey monochrome cards)

#### Various small fixes
In development of this change various small fixes were made to the old card design and edit menu, including the correct handling of missing data and ordering of characteristics in lists.
      `,
  },
  {
    releaseDate: new Date("2025-09-05T12:58:00Z"),
    type: 'Fix',
    version: 'v1.0.2b',
    changes: `
- Fix saving of 'replace kit value' in the bonuses system.
- Add capability to add a backing to any effect block that starts with '#' in the same way that 'Trigger' does.
      `,
  },
  {
    releaseDate: new Date("2025-09-04T02:54:00Z"),
    type: 'Fix',
    version: 'v1.0.2a',
    changes: `
- Fix potencies to display (more) correctly, using the highest characteristic score
  - This fix lays the groundwork for...
    - Setting the specific score to use for potencies, as there are cases where it won't be your highest stat.
    - Adding a "Potency Bonus" (added even after verifying that this isn't a thing anywhere in the game).
  - Adding these options to UI will be done in a follow-up change.
      `,
  },
  {
    releaseDate: new Date("2025-09-04T01:53:00Z"),
    type: 'Feature',
    version: 'v1.0.2',
    title: 'Add "Render without Hero" button',
    changes: `
- Added a new button in the top-bar of the workspace that allows you to blank out the hero stats all the rendered cards
  - This allows you to see your cards with rendered stats digitally, but display the 'default' card for for printing with Ctrl+P
- The top-bar has also been made "sticky" so it stays with the window while scrolling down
  - This is to let you toggle the button and see changes in the cards, even if the first rows of cards are things like "Mark" which aren't usually affected by hero stats. 
      `,
  },
  {
    releaseDate: new Date("2025-09-03T00:30:57Z"),
    type: 'Fix',
    version: "v1.0.1b",
    changes: `
- Print (with ctrl + P) has been updated
  - Now uses default "small-but-safe" margins
  - Now applies a 1mm gap between cards
  - Invisible footer that was causing a blank page is now 'hidden'
- Power Rolls now handle blank elements better 
  - A fully blank power roll tier will display an empty box with the correct attenuated primary card colour
  - A fully blank power roll characteristic options renders 'Power Roll +' instead of 'Power Roll - 1' or 'Power Roll + :'
- Power Roll characteristic options have also been updated to handle "Your Highest Characteristic Score" cases 
      `,
  },
  {
    releaseDate: new Date("2025-09-02"),
    type: 'Fix',
    version: "v1.0.1a",
    changes: `
- **Grab** and **Knockback** distance updated from Melee [10] to Melee [1]
  - Turns out it was using string values, so it wasn't '10' it was '1' + '0' 
      `,
  },
  {
    releaseDate: new Date("2025-09-02"),
    type: 'Feature',
    version: "v1.0.1",
    title: "Changelog added",
    changes: `
- We have implemented this changelog to help track changes and bugfixes
    - The button that summons this changelog will highlight if there has been a change since you last looked at it.
- A "Report a Bug" button has also been added which links to a Google Form that allows you to reports various types of bugs, give feedback, and suggest features.
      `,
  },
  {
    releaseDate: new Date("2025-09-02"),
    type: 'Fix',
    version: "v1.0.0a",
    changes: `
- Add Cardlist name to Hero Stats menu
      `,
  },
] satisfies Change[]

export function getChangesSinceTime(d : Date) {
  let count = 0;
  for (const v of changelog) {
    if (d.valueOf() > v.releaseDate.valueOf()) {
      return count;
    }
    count++;
  }
  return count;
}
