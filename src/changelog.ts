
export type Change = {
  releaseDate: Date,
  type: 'Feature' | 'Fix',
  version: string,
  title?: string,
  changes: string,
}

export const changelog : Change[] = [
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
