define({
  "potions_demux": { min: 1, max: 100, entries: [
    {
      min: 1,
      max: 75,
      appendMe: "-common"
    },
    {
      min: 76,
      max: 100,
      appendMe: "-uncommon"
    }
  ]},
  "scrolls_demux": { min: 1, max: 100, entries: [
    {
      min: 1,
      max: 45,
      appendMe: "-arcane-common"
    },
    {
      min: 46,
      max: 60,
      appendMe: "-arcane-uncommon"
    },
    {
      min: 61,
      max: 90,
      appendMe: "-divine-common"
    },
    {
      min: 91,
      max: 100,
      appendMe: "-divine-uncommon"
    }
  ]},
  "wands_demux": { min: 1, max: 100, entries: [
    {
      min: 1,
      max: 75,
      appendMe: "-common"
    },
    {
      min: 76,
      max: 100,
      appendMe: "-uncommon"
    }
  ]}
});
