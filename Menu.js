function Menu(label)
{
	this.label = label;
	this.id = "item";
	
	this.addSelfTo = function(parent, id)
	{
		var con = document.createElement('p');
		
		con.innerHTML = this.label;
		con.id = this.id;
		//con.style.display = "none";
		con.style.position = "relative";
		con.style.display = "block";
		con.style.zindex = 1;
		con.style.cursor = "pointer";
		this.backgroundColor;
		this.textColor;
		
		if(document.getElementById(parent) != null)
		{
			this.id = this.id + "_" + id;
			con.id = this.id
			document.getElementById(parent).appendChild(con);
			
			if(this.mouseOverListener != null)
				con.addEventListener('mouseover', this.mouseOverListener, false);
			else
			{
				con.addEventListener('mouseover', 
				function() 
				{ 
					var el = document.getElementById(this.id);
					console.log("On " + el.id);
					if(el === event.target)
					{
						this.backgroundColor = "blue";
						this.textColor = "white";
						if(document.getElementById(this.id) != null)
						{
							document.getElementById(this.id).style.backgroundColor = this.backgroundColor; 
							document.getElementById(this.id).style.color = this.textColor;
						}
					}
				}, false);
			}
			if(this.mouseOutListener != null)
				con.addEventListener('mouseout', this.mouseOutListener, false);
			else
			{
				con.addEventListener('mouseout', 
				function() 
				{ 
					var el = document.getElementById(this.id);
					if(el === event.target)
					{
						this.backgroundColor = "";
						this.textColor = "black";
						if(document.getElementById(this.id) != null)
						{
							document.getElementById(this.id).style.backgroundColor = this.backgroundColor; 
							document.getElementById(this.id).style.color = this.textColor;
						} 
					}
				}, false);
			}
			
			if(this.mouseClickListener != null)
				con.addEventListener('click', this.mouseClickListener, false);
		}
		
		/*
		if(this.children > 0)
		{
			for(var i = 0; i!= this.children.length; i++)
			{
				this.children[i].addSelfTo(this.id, i);
			}
		}
		*/
	}
}
