
export type Change = {
  releaseDate: Date,
  type: 'Feature' | 'Fix',
  version: string,
  title?: string,
  changes: string,
}

export const changelog : Change[] = [
  {
    releaseDate: new Date("2025-09-02"),
    type: 'Fix',
    version: "v1.0.1",
    changes: `
- **Grab** and **Knockback** distance updated from Melee [10] to Melee [1]
      `,
  },
  {
    releaseDate: new Date("2025-09-02"),
    type: 'Feature',
    version: "v1.0.0",
    title: "Changelog added",
    changes: `
- We have implemented this changelog to help track changes and bugfixes
    - The button that summons this changelog will highlight if there has been a change since you last looked at it.
- A "Report a Bug" button has also been added which links to a Google Form that allows you to reports various types of bugs, give feedback, and suggest features.
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
