var Templates = Templates || {};

Templates.FlightViewTemplate = [
	"<th scope='row'>{{origin}}</th>",
    "<td>{{destination}}</td>",
    "<td>{{distance}}</td>",
    "<td>{{price}}</td>"
].join("\n");