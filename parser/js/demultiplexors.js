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
  "scrolls-demux": { min: 1, max: 100, entries: [
    {

    }
  ]}
});
