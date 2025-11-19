comp_id = prompt('comp id')
result = await fetch("https://www.worldcubeassociation.org/api/v1/competitions/" + comp_id + "/registrations/admin");
json = await result.json();
waiting_list = json.filter((person) => person.competing.registration_status === 'waiting_list');
waiting_list.sort((a, b) => a.competing.waiting_list_position - b.competing.waiting_list_position)
text_result = '| Pozycja/Position | Osoba/Person |\n| -- | ---- |\n' + waiting_list.map((person) => {
	if(person.user.wca_id == null){
		return `| ${person.competing.waiting_list_position} | ${person.user.name} |`
	}
	else{
		return `| ${person.competing.waiting_list_position} | [${person.user.name}](https://worldcubeassociation.org/persons/${person.user.wca_id}) |`
	}
	}).join('\n')
console.log(text_result)
navigator.clipboard.writeText(text_result)