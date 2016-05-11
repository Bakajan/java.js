function Frame(parent)
{
	this.children = [];

	this.height = "100%";
	this.width = "100%";
	this.color = "white";
	this.id = 'frame';
	
	var con = document.createElement('div');
	con.id = this.id;
	con.style.background = this.color;
	
	document.getElementById(parent).appendChild(con);
	
	for(var i = 0; i!= this.children.length; i++)
	{
		this.children[i].addSelfTo(this.id, i);
	}

	this.add = function(object)
	{
		this.children.push(object);
		object.addSelfTo(this.id, this.children.length - 1);
	};
}
