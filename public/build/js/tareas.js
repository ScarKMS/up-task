!function(){!async function(){try{const a="/api/tareas?task="+n(),o=await fetch(a),r=await o.json();e=r.tareas,t()}catch(e){console.log(e)}}();let e=[];function t(){if(function(){const e=document.querySelector("#listado-tareas");for(;e.firstChild;)e.removeChild(e.firstChild)}(),0===e.length){const e=document.querySelector("#listado-tareas"),t=document.createElement("LI");return t.textContent="No hay Tareas, crea una",t.classList.add("no-tareas"),void e.appendChild(t)}const t={0:"Pendiente",1:"Completa"};e.forEach(e=>{const a=document.createElement("LI");a.dataset.tareaId=e.id,a.classList.add("tarea");const n=document.createElement("P");n.textContent=e.nombre;const o=document.createElement("DIV");o.classList.add("opciones");const r=document.createElement("button");r.classList.add("estado-tarea"),r.classList.add(""+t[e.estado].toLowerCase()),r.textContent=t[e.estado],r.dataset.estadoTarea=e.estado;const c=document.createElement("button");c.classList.add("eliminar-tarea"),c.dataset.idTarea=e.id,c.textContent="Eliminar",o.appendChild(r),o.appendChild(c),a.appendChild(n),a.appendChild(o);document.querySelector("#listado-tareas").appendChild(a)})}function a(e,t,a){const n=document.querySelector(".alerta");n&&n.remove();const o=document.createElement("DIV");o.classList.add("alerta",t),o.textContent=e,a.parentElement.insertBefore(o,a.nextElementSibling),setTimeout(()=>{o.remove()},3500)}function n(){const e=new URLSearchParams(window.location.search);return Object.fromEntries(e.entries()).task}document.querySelector("#agregar-tarea").addEventListener("click",(function(){const o=document.createElement("DVI");o.classList.add("modal"),o.innerHTML='\n            <form class="formulario nueva-tarea">\n                <legend>Agrega una Nuvea Tarea</legend>\n                <div class="campo">\n                    <label for="tarea" class="tarea">Tarea</label>\n                    <input type="text" name="tarea" placeholder="Agrega tarea al Proyecto Actual" id="tarea">\n                </div>\n                <div class="opciones">\n                    <input type="submit" value="Agregar Tarea" class="submit-nueva-tarea">\n                    <button type="button" class="cerrar-modal">Cancelar</button>\n                </div> \n            </form>\n        ',setTimeout(()=>{document.querySelector(".formulario").classList.add("animar")},100),o.addEventListener("click",(function(r){if(r.preventDefault(),r.target.classList.contains("cerrar-modal")){document.querySelector(".formulario").classList.add("cerrar"),setTimeout(()=>{o.remove()},200)}r.target.classList.contains("submit-nueva-tarea")&&function(){const o=document.querySelector("#tarea").value.trim();if(""===o)return referencia=document.querySelector(".formulario legend"),void a("El nombre de la tarea es obligatorio","error",referencia);!async function(o){const r=new FormData;r.append("nombre",o),r.append("proyectoId",n());try{const n="http://localhost:3000/api/tarea",c=await fetch(n,{method:"POST",body:r}),s=await c.json();if(referencia=document.querySelector(".formulario legend"),a(s.mensaje,s.tipo,referencia),"exito"===s.tipo){const a=document.querySelector(".modal");setTimeout(()=>{a.remove()},1e3);const n={id:String(s.id),nombre:o,estado:"0",proyectoId:s.proyectoId};e=[...e,n],t()}}catch(e){console.log(e)}}(o)}()})),document.querySelector(".dashboard").appendChild(o)}))}();