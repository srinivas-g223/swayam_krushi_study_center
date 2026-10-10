(function(){
'use strict';
var $=function(s,r){return(r||document).querySelector(s)},$$=function(s,r){return[].slice.call((r||document).querySelectorAll(s))};
var reduce=matchMedia('(prefers-reduced-motion:reduce)').matches;
var toastEl=$('#toast'),tmr;function toast(m){toastEl.textContent=m;toastEl.classList.add('on');clearTimeout(tmr);tmr=setTimeout(function(){toastEl.classList.remove('on')},3600)}

/* Add real reviews from the Justdial listing here */
var REVIEWS=[{name:'Ravi Kumar',role:'Group 2 Aspirant',img:'images/avatar.jpg',text:'Swayam Krushi Study Centre provided excellent guidance and study material. The faculty is very supportive and helped me a lot in my preparation.'}];

function ready(){$('#loader').classList.add('off');setTimeout(function(){$('#copy').classList.add('in')},350)}
addEventListener('load',function(){setTimeout(ready,reduce?0:900)});setTimeout(ready,3500);

var hdr=$('#hdr'),prog=$('#prog'),topb=$('#totop'),links=$$('#nav a'),secs=links.map(function(a){return $(a.getAttribute('href'))});
function onScroll(){var y=scrollY,h=document.documentElement.scrollHeight-innerHeight;
 hdr.classList.toggle('s',y>30);prog.style.width=(h>0?y/h*100:0)+'%';topb.classList.toggle('on',y>600);
 var cur=0;secs.forEach(function(s,i){if(s&&s.getBoundingClientRect().top<innerHeight*.4)cur=i});links.forEach(function(a,i){a.classList.toggle('on',i===cur)})}
addEventListener('scroll',onScroll,{passive:true});onScroll();
topb.addEventListener('click',function(){scrollTo({top:0})});
var nav=$('#nav');$('#burger').addEventListener('click',function(){nav.classList.toggle('open')});nav.addEventListener('click',function(e){if(e.target.closest('a'))nav.classList.remove('open')});

var io=new IntersectionObserver(function(es){es.forEach(function(e){if(!e.isIntersecting)return;var t=e.target,sib=$$('.rv',t.parentNode),i=Math.max(0,sib.indexOf(t));setTimeout(function(){t.classList.add('in')},reduce?0:i*110);io.unobserve(t)})},{threshold:.15});
$$('.rv').forEach(function(el){io.observe(el)});

/* Count-up numbers (2012 and 4.8) */
var cio=new IntersectionObserver(function(es){es.forEach(function(e){if(!e.isIntersecting)return;cio.unobserve(e.target);var b=e.target,to=+b.dataset.n,d=+b.dataset.d||0,s=b.dataset.s||'';
 if(reduce){return}var t0=null,from=d?0:to-60;(function st(t){t0=t0||t;var p=Math.min((t-t0)/1700,1),v=from+(to-from)*(1-Math.pow(1-p,3));b.textContent=v.toFixed(d)+s;if(p<1)requestAnimationFrame(st)})(performance.now())})},{threshold:.8});
$$('[data-n]').forEach(function(b){cio.observe(b)});

/* 3D tilt on course cards */
if(matchMedia('(hover:hover) and (pointer:fine)').matches&&!reduce)$$('.cc').forEach(function(c){
 c.addEventListener('mousemove',function(e){var r=c.getBoundingClientRect(),x=(e.clientX-r.left)/r.width-.5,y=(e.clientY-r.top)/r.height-.5;c.style.transform='perspective(800px) rotateY('+x*10+'deg) rotateX('+-y*10+'deg) translateY(-8px)'});
 c.addEventListener('mouseleave',function(){c.style.transform=''})});

/* Hero parallax */

/* Reviews carousel */
var rbox=$('#rbox'),rdots=$('#rdots'),ri=0,rt;
function showR(n){ri=(n+REVIEWS.length)%REVIEWS.length;var r=REVIEWS[ri];
 rbox.innerHTML='<div class="rcard"><img src="'+r.img+'" alt="'+r.name+'"><div><h4>'+r.name+'</h4><small>'+r.role+'</small><span class="st">&#9733;&#9733;&#9733;&#9733;&#9733;</span><p>&ldquo;'+r.text+'&rdquo;</p></div></div>';
 $$('b',rdots).forEach(function(d,i){d.classList.toggle('on',i===ri)})}
function runR(){clearInterval(rt);if(!reduce&&REVIEWS.length>1)rt=setInterval(function(){showR(ri+1)},5500)}
rdots.innerHTML=REVIEWS.map(function(_,i){return'<b data-i="'+i+'"></b>'}).join('');
if(REVIEWS.length<2){$('#rp').style.display='none';$('#rn').style.display='none';rdots.style.display='none'}
rdots.addEventListener('click',function(e){var b=e.target.closest('b');if(b){showR(+b.dataset.i);runR()}});
$('#rn').addEventListener('click',function(){showR(ri+1);runR()});$('#rp').addEventListener('click',function(){showR(ri-1);runR()});
showR(0);runR();

/* FAQ accordion */
var acc=$('#acc');function openI(i,on){i.classList.toggle('open',on);var p=$('.ap',i);p.style.maxHeight=on?p.scrollHeight+'px':0}
acc.addEventListener('click',function(e){var b=e.target.closest('button');if(!b)return;var it=b.parentNode,was=it.classList.contains('open');$$('.ai',acc).forEach(function(x){openI(x,false)});openI(it,!was)});
openI($('.ai',acc),true);

/* Course card click pre-fills the enquiry message */
document.addEventListener('click',function(e){var a=e.target.closest('[data-ask]');if(a){var m=$('#fm');if(!m.value)m.value='I am interested in the '+a.dataset.ask+' course. Please share details.'}});

/* Contact form: validate, then open WhatsApp */
var f=$('#form'),err=$('#err');
f.addEventListener('submit',function(e){e.preventDefault();var n=$('#fn').value.trim(),p=$('#fp').value.trim(),m=$('#fm').value.trim();
 if(!n||!p||!m){err.textContent='Please fill in all the fields.';return}
 if(p.replace(/\D/g,'').length<10){err.textContent='Please enter a valid 10-digit phone number.';return}
 err.textContent='';window.open('https://wa.me/919676543210?text='+encodeURIComponent('Hello Swayam Krushi Study Centre, I am '+n+' ('+p+'). '+m),'_blank','noopener');
 toast('Thank you, '+n.split(' ')[0]+'! Opening WhatsApp to send your message.');f.reset()});
})();

/* Course syllabus popups */
(function(){
var CO={
'Group 2 (Andhra Pradesh)':{ic:'bank',tag:'APPSC Group 2 recruitment',about:'Group 2 is a state-level recruitment conducted by the Andhra Pradesh Public Service Commission (APPSC) for posts in Andhra Pradesh government departments.',st:['Screening / Prelims test','Main examination','Certificate verification'],sy:[['Prelims: General Studies & Mental Ability',['Current Affairs','History & Culture','Geography','Indian Polity','Indian Economy','General Science','Environment & Disaster Management','Logical Reasoning','Data Interpretation']],['Mains',['Social History of India & Culture of Andhra Pradesh','Overview of the Indian Constitution','Science & Technology','Planning in India & Indian Economy','Andhra Pradesh Economy']]]},
'Civil Services (UPSC)':{ic:'emb',tag:'IAS, IPS, IFS and other central services',about:'The UPSC Civil Services Examination selects officers for the All India and Central services through three stages.',st:['Prelims (GS Paper I + CSAT)','Mains (written papers incl. Essay)','Interview / Personality Test'],sy:[['General Studies',['Ancient, Medieval & Modern History','Indian Heritage & Culture','Polity & Governance','Geography','Indian Economy','Environment & Ecology','Science & Technology','Internal Security','Ethics, Integrity & Aptitude','Current Affairs']],['CSAT (Prelims Paper II)',['Reading Comprehension','Logical Reasoning','Basic Numeracy','Data Interpretation']],['Mains extras',['Essay Writing','Optional Subject']]]},
'Banking Exams (IBPS, IBPS RRB)':{ic:'bank',tag:'IBPS PO / Clerk and IBPS RRB posts',about:'Banking exams recruit officers and clerks for public sector banks and regional rural banks through an online test followed by further rounds.',st:['Preliminary exam','Main exam','Interview (for officer posts)'],sy:[['Core sections',['Quantitative Aptitude / Numerical Ability','Reasoning Ability','English Language','Data Analysis & Interpretation']],['Mains additions',['General / Financial Awareness','Banking Awareness','Computer Knowledge','Descriptive English (where applicable)']]]},
'Police Recruitment Exams':{ic:'shield',tag:'Constable and Sub-Inspector recruitment',about:'Police recruitment combines written tests with physical tests. Preparation needs both academics and fitness.',st:['Preliminary written test','Physical measurement & efficiency tests','Final written test','Document verification'],sy:[['Written test',['General Studies','Arithmetic','Reasoning / Mental Ability','English','Telugu','Current Affairs']],['Physical rounds',['Physical measurement test','Physical efficiency events']]]},
'Railway Exams':{ic:'train',tag:'RRB NTPC, Group D, ALP and more',about:'Railway Recruitment Board exams are computer-based tests that fill technical and non-technical posts across Indian Railways.',st:['Computer-based test (CBT) stage 1','CBT stage 2 / skill or aptitude test (post-wise)','Physical efficiency test (Group D)','Document verification & medical'],sy:[['Common subjects',['Mathematics','General Intelligence & Reasoning','General Awareness & Current Affairs','General Science (Physics, Chemistry, Biology)']]]},
'DSC / Teaching Related':{ic:'book',tag:'Teacher recruitment (DSC) and eligibility (TET)',about:'To become a government school teacher you first qualify the Teacher Eligibility Test (TET) and then appear for the DSC recruitment test.',st:['Qualify TET (eligibility)','DSC written test','Merit list & certificate verification'],sy:[['Common papers',['General Knowledge & Current Affairs','Child Development & Pedagogy','Perspectives in Education','Teaching Methodology']],['Subject content (as per post)',['Telugu','English','Mathematics','Science','Social Studies']]]}
};
var SUBJECTS={
'History':{about:'Build a timeline-based understanding of Indian history, heritage and Andhra Pradesh history for competitive examinations.',sy:[['Core topics',['Ancient India: Indus Valley, Vedic age and major empires','Medieval India: kingdoms, administration and culture','Modern India: colonial rule and social reform','Indian freedom movement and national leaders','Indian art, literature and cultural heritage','Andhra Pradesh history, society and culture']]]},
'Geography':{about:'Study physical and human geography with an emphasis on India and Andhra Pradesh, maps, resources and current geographical issues.',sy:[['Core topics',['Earth structure, landforms and climatology','Rivers, soils, natural vegetation and resources','Indian physical features, monsoon and agriculture','Population, settlement, transport and industries','Andhra Pradesh geography, rivers and resources','Map reading and location-based questions']]]},
'Indian Polity':{about:'Understand the Constitution, institutions and governance systems that shape India and Andhra Pradesh.',sy:[['Core topics',['Constitutional history, Preamble and key features','Fundamental Rights, Duties and Directive Principles','Union and state governments, Parliament and legislatures','Judiciary, constitutional bodies and federal relations','Local self-government and public administration','Governance, citizen services and Andhra Pradesh administration']]]},
'Indian Economy':{about:'Learn foundational economic concepts and apply them to development, public finance and current Indian and Andhra Pradesh economy topics.',sy:[['Core topics',['Basic concepts: national income, inflation and growth','Agriculture, industry and services sectors','Planning, development and inclusive growth','Poverty, unemployment and government welfare programmes','Public finance, taxation, banking and monetary policy','Andhra Pradesh economy, budget and development indicators']]]},
'General Science':{about:'Revise the science fundamentals and everyday applications commonly tested in general studies and recruitment examinations.',sy:[['Core topics',['Physics: motion, force, energy, light and electricity','Chemistry: matter, elements, reactions and everyday chemistry','Biology: cells, body systems, nutrition and diseases','Agriculture, health and science in daily life','Important technology and scientific developments','Basic scientific reasoning and observation']]]},
'Environment':{about:'Explore ecosystems, biodiversity, conservation and climate-related issues, including their links to current affairs.',sy:[['Core topics',['Ecosystems, food chains and ecological balance','Biodiversity, wildlife and protected areas','Pollution, waste management and conservation','Climate change, global warming and international agreements','Environmental laws, institutions and impact assessment','Disaster management and sustainable development']]]},
'Current Affairs':{about:'Connect important recent events with static subjects and practise understanding their background, impact and relevance to exams.',sy:[['Coverage areas',['National and international events','Andhra Pradesh government schemes and state developments','Polity, governance and important judgments','Economy, budget, banking and major reports','Science, technology, environment and awards','Sports, appointments and important days']]]},
'Quantitative Aptitude':{about:'Develop accuracy and speed in numerical problem-solving using core arithmetic, calculation and exam-style practice.',sy:[['Core topics',['Number system, simplification and approximation','Percentages, ratio and proportion, averages','Profit and loss, discount and partnership','Simple and compound interest','Time and work, pipes and cisterns','Speed, distance and time; trains and boats','Mixtures, ages and basic algebra']]]},
'Logical Reasoning':{about:'Practise identifying relationships, patterns and valid conclusions in verbal and analytical reasoning questions.',sy:[['Core topics',['Analogy, classification and odd-one-out','Number and letter series, coding and decoding','Directions, blood relations and rankings','Syllogisms and statement-based conclusions','Seating arrangements and logical puzzles','Assumptions, arguments and cause-and-effect reasoning']]]},
'Data Interpretation':{about:'Learn to read, compare and calculate information presented in tables, charts and short data sets.',sy:[['Core topics',['Tables and caselet-based data','Bar, line and pie charts','Mixed graphs and comparison sets','Percentages, ratios, averages and change over time','Data sufficiency and missing-data questions','Fast calculation and approximation techniques']]]},
'Mental Ability':{about:'Strengthen analytical and non-verbal problem-solving skills used in state and central recruitment tests.',sy:[['Core topics',['Pattern recognition and number or figure series','Classification, analogy and missing terms','Spatial orientation, mirror and paper-folding problems','Calendars, clocks and sequence-based questions','Logical puzzles, arrangements and deductions','Basic quantitative and decision-making problems']]]},
'English':{about:'Build the grammar, vocabulary, comprehension and writing skills needed for objective and descriptive exam papers.',sy:[['Core topics',['Parts of speech, tenses and subject-verb agreement','Articles, prepositions, voice and narration','Vocabulary, synonyms, antonyms and idioms','Error spotting, sentence correction and usage','Reading comprehension and cloze tests','Precis, letter and short descriptive writing where required']]]},
'Telugu':{about:'Strengthen Telugu grammar, vocabulary and comprehension for Telugu-medium and language sections in recruitment examinations.',sy:[['Core topics',['వ్యాకరణం: పదభేదాలు, సంధులు, సమాసాలు','పర్యాయపదాలు, వ్యతిరేక పదాలు మరియు జాతీయాలు','వాక్య నిర్మాణం, దోష సవరణ మరియు భాషా వినియోగం','గద్య పఠనం మరియు అవగాహన','తెలుగు సాహిత్యం, రచయితలు మరియు ముఖ్య రచనలు','అనువాదం మరియు రచనా నైపుణ్యాలు (పరీక్ష అవసరాన్ని బట్టి)']]]},
'Banking Awareness':{about:'Understand the Indian banking and financial system, key institutions, products and developments relevant to banking recruitment tests.',sy:[['Core topics',['RBI, monetary policy and regulation','Indian banking structure and financial institutions','Accounts, deposits, loans and payment systems','Financial inclusion, digital banking and cyber safety','Banking terminology, budgets and major schemes','Recent banking and financial current affairs']]]},
'Computer Knowledge':{about:'Cover the computer fundamentals and digital concepts commonly included in banking and other competitive examinations.',sy:[['Core topics',['Computer components, memory and input/output devices','Operating systems, files and common software','Word processing, spreadsheets and presentation tools','Internet, email, networking and digital payments','Databases, basic cybersecurity and safe computing','Computer terminology and emerging technology basics']]]},
'Child Development & Pedagogy':{about:'Study how children learn and develop, and how inclusive, learner-centred teaching supports different needs.',sy:[['Core topics',['Child growth and development across stages','Learning theories, motivation and individual differences','Influences of family, community and social context','Inclusive education and support for diverse learners','Assessment, evaluation and classroom observation','Teaching-learning processes and learner-centred practice']]]},
'Teaching Methodology':{about:'Explore practical methods for planning lessons, teaching subject content and assessing student learning.',sy:[['Core topics',['Learning objectives, lesson planning and teaching aids','Learner-centred, activity-based and experiential methods','Subject-specific pedagogy and classroom communication','Classroom management and inclusive teaching','Formative and summative assessment, feedback and remediation','Educational technology and reflective teaching practice']]]}
};
var how=['Concept classes with experienced faculty','Study materials and notes','Regular tests and evaluation','Doubt clarification and personalised guidance'];
var mod=document.createElement('div');mod.className='mod';mod.setAttribute('role','dialog');mod.setAttribute('aria-modal','true');mod.setAttribute('aria-label','Syllabus details');document.body.appendChild(mod);
var last=null,cur='';
function esc(s){return String(s).replace(/&/g,'&amp;').replace(/</g,'&lt;')}
function open(key,from){var course=!!CO[key],d=CO[key]||SUBJECTS[key];if(!d)return;cur=key;last=from;var k=0;
 mod.innerHTML='<div class="mbox" tabindex="-1"><div class="mhead"><span class="ci"><svg><use href="#'+(d.ic||'book')+'"/></svg></span><div><h3>'+esc(key)+'</h3><p>'+esc(d.tag||'Subject syllabus and preparation guide')+'</p></div><button class="mx" type="button" aria-label="Close">&times;</button></div><div class="mbody">'+
 '<h5>'+(course?'About this exam':'About this subject')+'</h5><p>'+esc(d.about)+'</p>'+(course?'<h5>Exam stages</h5><ol class="mst">'+d.st.map(function(s){return'<li>'+esc(s)+'</li>'}).join('')+'</ol>':'')+'<h5>'+(course?'Syllabus overview':'Topics covered')+'</h5>'+
 d.sy.map(function(g){return'<div class="mgrp"><b>'+esc(g[0])+'</b><div class="mchips">'+g[1].map(function(c){return'<span style="--i:'+(k++)+'">'+esc(c)+'</span>'}).join('')+'</div></div>'}).join('')+
 '<h5>'+(course?'How we prepare you':'How we cover this subject')+'</h5><ul class="mhow">'+how.map(function(x){return'<li>'+esc(x)+'</li>'}).join('')+'</ul>'+
 '<p class="mnote">'+(course?'This is a general overview. Exam patterns and syllabus are set by the conducting body and can change, so please check the latest official notification. Ask us for the current plan.':'Topics are a general study guide; exact coverage depends on your target exam and its latest official syllabus. Contact us for the subject plan that matches your exam.')+'</p>'+
 '<div class="mcta"><button class="btn gold" type="button" data-enq>Enquire about this '+(course?'course':'subject')+' <svg><use href="#arr"/></svg></button><button class="btn dark" type="button" data-close>Close</button></div></div></div>';
 mod.classList.add('on');document.body.style.overflow='hidden';mod.querySelector('.mbox').focus()}
function close(){mod.classList.remove('on');document.body.style.overflow='';if(last)last.focus({preventScroll:true})}
mod.addEventListener('click',function(e){if(e.target===mod||e.target.closest('.mx,[data-close]'))close();
 if(e.target.closest('[data-enq]')){var m=document.getElementById('fm');if(m)m.value='I am interested in '+(CO[cur]?'the '+cur+' course':'the '+cur+' subject')+'. Please share details.';close();document.getElementById('contact').scrollIntoView({behavior:'smooth'})}});
document.addEventListener('keydown',function(e){if(e.key==='Escape'&&mod.classList.contains('on'))close()});
document.addEventListener('click',function(e){var a=e.target.closest('.cc[data-ask]');if(a){e.preventDefault();open(a.dataset.ask,a)}},true);
document.addEventListener('click',function(e){var a=e.target.closest('.subject-chip[data-subject]');if(a){e.preventDefault();open(a.dataset.subject,a)}},true);
})();
