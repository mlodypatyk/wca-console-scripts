fetch('https://www.worldcubeassociation.org/api/v0/competitions/OlsztynOpen2025/wcif/public?xD=7',{headers: {"cache-control": "no-cache"}}).then(r => r.json()).then(wcif => {
  const competitorsWithRank = wcif.persons.map(person => 
    [person, person.assignments.filter(a => ['staff-scrambler','staff-runner','staff-judge'].includes(a.assignmentCode)).length]
  );
  console.log('| Staffing | Person | WCA ID |')
  const ranking = competitorsWithRank
    .sort(([p1, r1], [p2, r2]) => r2 - r1)
    .map(([person, rank]) => `| ${rank} | ${person.name} | ${person.wcaId} |`)
    .join('\n');
  console.log(ranking);
});