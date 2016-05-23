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
		con.style.zindex = 99;
		con.style.cursor = "pointer";
		this.backgroundColor = "";
		this.hoverBackgroundColor = "blue";
		this.textColor = "black";
		this.hoverTextColor = "white";
		
		if(document.getElementById(parent) != null)
		{
			this.id = this.id + "_" + id;
			con.id = this.id;
			con.style.color = this.textColor;
			document.getElementById(parent).appendChild(con);
			
			if(this.mouseOverListener != null)
				con.addEventListener('mouseover', this.mouseOverListener, false);
			else
			{
				con.addEventListener('mouseover', 
				function() 
				{ 
					var el = document.getElementById(this.id);
					if(el === event.target)
					{
						this.hoverBackgroundColor = "blue";
						this.hoverTextColor = "white";
						if(document.getElementById(this.id) != null)
						{
							document.getElementById(this.id).style.backgroundColor = this.hoverBackgroundColor; 
							document.getElementById(this.id).style.color = this.hoverTextColor;
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
		
		this.getHoverBackgroundColor = function()
		{
			if(document.getElementById(this.id) != null)
			{
				return this.hoverBackgroundColor;
			}
		}
		
		this.setHoverBackgroundColor = function(color)
		{
			console.log("0: " + color);
			if(document.getElementById(this.id) != null)
			{
				this.hoverBackgroundColor = color;
				var updateHover = function() 
				{ 
					document.getElementById(this.id).style.backgroundColor = color; 
					document.getElementById(this.id).style.color = this.hoverTextColor; 
				};
				
				var el = document.getElementById(this.id);
				el.addEventListener('mouseover', updateHover, true);
			}
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
	this.addmouseClickListener = function(toDo)
	{
		this.mouseClickListener = toDo;
		if(document.getElementById(this.id) != null)
		{
			var element = document.getElementById(this.id);
			element.addEventListener('click', toDo);
		}
	}
}
