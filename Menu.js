function Menu(label)
{
	this.label = label;
	this.id = "item";
	
	this.addSelfTo = function(parent, id)
	{
		var con = document.createElement('p');
		
		con.innerHTML = this.label;
		con.id = this.id;
		con.style.position = "absolute";
		con.style.zindex = 1;
		con.style.cursor = "pointer";
		console.log("add self to " + parent);
		
		if(document.getElementById(parent) != null)
		{
			console.log("parent is here");
			if(this.mouseOverListener != null)
				con.addEventListener('mouseover', this.mouseOverListener, false);
			if(this.mouseOutListener != null)
				con.addEventListener('mouseout', this.mouseOutListener, false);
			if(this.mouseClickListener != null)
				con.addEventListener('click', this.mouseClickListener, false);
				
			this.id = this.id + "_" + id;
			document.getElementById(parent).appendChild(con);
		}

		if(this.children.length > 0)
		{
			for(var i = 0; i!= this.children.length; i++)
			{
				this.children[i].addSelfTo(this.id, i);
			}
		}
	}
}
