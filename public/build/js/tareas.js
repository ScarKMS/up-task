document.querySelector("#agregar-tarea").addEventListener("click",(function(){const e=document.createElement("DVI");e.classList.add("modal"),e.innerHTML='\n            <form class="formulario nueva-tarea">\n                <legend>Agrega una Nuvea Tarea</legend>\n                <div class="campo">\n                    <label for="tarea" class="tarea">Tarea</label>\n                    <input type="text" name="tarea" placeholder="Agrega tarea al Proyecto Actual" id="tarea">\n                </div>\n                <div class="opciones">\n                    <input type="submit" value="Agregar Tarea" class="submit-nueva-tarea">\n                    <button type="button" class="cerrar-modal">Cancelar</button>\n                </div> \n            </form>\n        ',setTimeout(()=>{document.querySelector(".formulario").classList.add("animar")},100),e.addEventListener("click",(function(a){a.preventDefault(),a.target.classList.contains("cerrar-modal")&&(document.querySelector(".formulario").classList.add("cerrar"),setTimeout(()=>{e.remove()},200)),a.target.classList.contains("submit-nueva-tarea")&&function(){const e=document.querySelector("#tarea").value.trim();if(""===e)return referencia=document.querySelector(".formulario legend"),void function(e,a,t){const r=document.querySelector(".alerta");r&&r.remove();const n=document.createElement("DIV");n.classList.add("alerta",a),n.textContent=e,t.parentElement.insertBefore(n,t.nextElementSibling),setTimeout(()=>{n.remove()},3500)}("El nombre de la tarea es obligatorio","error",referencia);!async function(e){const a=new FormData;a.append("nombre",e);try{const e="http://localhost:3000/api/tarea",t=await fetch(e,{method:"POST",body:a}),r=await t.json();console.log(r)}catch(e){console.log(e)}}(e)}()})),document.querySelector(".dashboard").appendChild(e)}));