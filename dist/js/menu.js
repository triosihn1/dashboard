//Memanggil File Json

try{
//Matikan klik kanan
function mousedwn(e){try{if(event.button==2||event.button==3)return false}catch(e){if(e.which==3)return false}}document.oncontextmenu=function(){return false};document.ondragstart=function(){return false};document.onmousedown=mousedwn
	//Ambil tag html
	tagMl = document.querySelector('[data-widget=treeview]');
	tagBat = document.getElementById('batrai');
	tagJam = document.getElementById('jam');
	tagDate = document.getElementById('date');
	tagBro = document.getElementById('browser');
	tagFake = document.querySelector('#fakemsg')
	tagId = document.querySelector('#idmsg')
	tag = 0
	//Caital String
	function capital(string) {
		return string.charAt(0).toUpperCase() + string.toLowerCase().slice(1);
	}
	
	//Menu List Sidebar
	for (var e of itemSidebar) {
		codeTri = `<li class="nav-item">
		<a href="#" class="nav-link">
		<i class="${e.icon.trim()} nav-icon"></i>
		<p>${capital(e.title.trim())}
		${e.event ? `<span class="right badge badge-danger">${e.event.trim()}</span> <i class="right fas fa-angle-left"></i>`: `<i class="right fas fa-angle-left"></i><span class="right badge badge-danger">Test</span>`}
		</p>
		</a>
		<ul class="nav nav-treeview">
		%item$
		</ul>
		</li>
		`;
		item_codeTri  = '';
		for (var ee of e.item) {
			item_codeTri += `<li class="nav-item">
			<a ${ee.error ? `href="javascript:void(0);"` : `href="${ee.url.trim()}" target="_blank"` } class="nav-link">
			<p>
			⸙ ${capital(ee.name.trim())} 
			${ee.event ? `<span class="right badge badge-danger">${ee.event.trim()}</span>`: ``}
			${ee.error ? `<span class="right badge badge-danger">${ee.error}</span>`: ``}
			</p>
			</a>
			</li>`;
		}
		tagMl.innerHTML += codeTri.replace('%item$', item_codeTri)
	}
	
	//-- Battery
		setInterval(function() {
			navigator.getBattery().then(battery=> {
				battery_level = String(battery.level).split('.')[1];
				tagBat.innerHTML = `<h1>Battery</h1><small>${(battery_level.length <= 1)? oud(Number(battery_level)): battery_level}%</small> <p>Status : ${battery.charging ? 'charging': 'discharging'}</p>`;
			});
		},
			10);
			
			//Clock oclock
			let arrBulan = [
                "Januari",
                "Februari",
                "Maret",
                "April",
                "Mei",
                "Juni",
                "Juli",
                "Agustus",
                "September",
                "Oktober",
                "November",
                "Desember",
              ];
              let arrHari = [
            	"Minggu",
                "Senin",
                "Selasa",
                "Rabu",
                "Kami",
                "Jum'at",
                "Sabtu"
               ];
			setInterval(() => {
				var d = new Date();
				const jam = d.getHours().toString().padStart(2, 0);
                const menit = d.getMinutes().toString().padStart(2, 0);
                const detik = d.getSeconds().toString().padStart(2, 0);
                const hr = d.getDay();
                const hari = arrHari[hr]
                const tgl = d.getDate();
                const bln = d.getMonth();
                const thn = d.getFullYear();
                const bulan = arrBulan[bln];
                if (jam >= 19) {
				clock_string = 'malam';
			} else if (jam >= 18) {
				clock_string = 'petang';
			} else if (jam >= 15) {
				clock_string = 'Sore';
			} else if (jam >= 10) {
				clock_string = 'Siang';
			} else if (jam >= 5) {
				clock_string = 'Pagi';
			} else if (jam >= 3) {
				clock_string = 'subuh';
			} else if (jam >= 0) {
				clock_string = 'dini hari';
			} else {
				clock_string = 'hai bang';
			}

                tagJam.innerHTML = `<h1>Clock</h1><small>${jam}:${menit}:${detik}</small><p>${clock_string}</p>`;
                tagDate.innerHTML = `<h1>Date</h1><small>${hari}, ${tgl} ${bulan} ${thn}</small><p><a href="https://www.instagram.com/triosihn_">@triosihn</a></p>`;
                //-- Browser information
				tagBro.innerHTML = `<b>Browser CodeName:</b> ${navigator.appCodeName}<br><b>Browser Name:</b> ${navigator.appName}<br><b>Cookies Enabled:</b> ${navigator.cookieEnabled}<br><b>Browser Online:</b> ${navigator.onLine}<br><b>Platform:</b> ${navigator.platform} <br>
			<b>User-Agent:</b> ${navigator.userAgent} <br><b>Time: </b> ${new Date()}`;
			});

		
			//Fakes Message
			const scrollToBottom = (node) => {
				node.scrollTop = node.scrollHeight;
			}

			
			for(let m of fakeMsg){
				
					for(let mess of m.message){
						if(mess.status == "bot"){
							msg = `<div class="direct-chat-msg">
							<div class="direct-chat-infos clearfix">
							<span class="direct-chat-name float-left">${capital(mess.name.trim())}</span>
							</div>
							<!-- /.direct-chat-infos -->
							<img class="direct-chat-img" src="https://i.ibb.co/Dzh2bgt/IMG-20220413-WA0040.jpg" alt="${capital(mess.name.trim())}">
							<!-- /.direct-chat-img -->
							<div class="direct-chat-text">
							${mess.message}
							</div>
							</div>`;
						}else{
							msg += `<div class="direct-chat-msg right">
							<div class="direct-chat-infos clearfix">
							<span class="direct-chat-name float-right">${capital(mess.name.trim())}</span>
							</div>
							 <!-- /.direct-chat-infos -->
							<img class="direct-chat-img" src="https://i.ibb.co/rtV1zyM/images-6.jpg" alt="${capital(mess.name.trim())}">
							<!-- /.direct-chat-img -->
							<div class="direct-chat-text">
							${mess.message}
							</div>
							</div>`;
						}
					}
					tagFake.innerHTML += msg;
					tagId.innerText = 2;
					scrollToBottom(tagFake)
			}
			
			//Send Message WhatsApp
			function send_handle(){
				msg = document.getElementById('message').value;
				if(msg == ""){
					msg = "block me";
				}
				number = 62882003537466;
				var win = window.open(`https://api.whatsapp.com/send/?phone=${number}&text=${msg}&app_absent=0`);
			}
			
		
}catch(error){
	console.log(error)
}
