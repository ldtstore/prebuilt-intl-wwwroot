/*
  Copyright (c) 2021-2023 CarrotGeball and stackinspector. All rights reserved. MIT license.
  Source: https://github.com/stackinspector/ldtstore-homepage
  Commit (content): 46a6aab
  Commit (codegen): c1cccdf
*/

(()=>{const DATA=window.__DATA__;delete window.__DATA__;const body=document.body,background=document.getElementById("background"),content=document.getElementById("content"),offset=document.getElementById("offset"),major=document.getElementById("major"),side=document.getElementById("side"),search=document.getElementById("search"),back=document.getElementById("back"),changeMajor=document.getElementById("change-major"),clear=el=>{for(;el.firstChild;)el.removeChild(el.lastChild)},copy=text=>{navigator.clipboard.writeText(text)};let layoutMode=0;const RecalculateState={sidePosition:0,distance:300,center:!1},SideState={on:!1,id:null},MajorState={id:"tiles"};let touchX=0,touchY=0;window.ontouchstart=e=>{touchX=e.touches[0].clientX,touchY=e.touches[0].clientY};window.ontouchend=e=>{const x=e.changedTouches[0].clientX,y=e.changedTouches[0].clientY;touchX-x<-40&&Math.abs((touchY-y)/(touchX-x))<.2&&sideClose()};content.onclick=background.onclick=e=>{(e.composedPath()[0]===content||e.composedPath()[0]===background)&&sideClose()};DATA.page_type==="tool"&&(search.onclick=e=>{e.stopPropagation(),sideSet("search")},back.onclick=e=>{e.stopPropagation(),window.open("/","_blank")},changeMajor.onclick=e=>{e.stopPropagation(),changeMajorAction()});const sideMove=enable=>{SideState.on!==enable&&(SideState.on=enable,enable||(SideState.id=null),positionSet())},setTransitionDuration=(time=.4)=>{offset.style.transitionDuration=side.style.transitionDuration=`${time}s`},positionSet=()=>{SideState.on?(offset.style.left=`${-RecalculateState.distance}px`,side.style.left=`${RecalculateState.sidePosition-RecalculateState.distance}px`):(offset.style.left="0",side.style.left=`${RecalculateState.sidePosition}px`)},sideChange=id=>{const enable=id!==null;if(enable&&renderSide(id),side.style.opacity=enable?"1":"0",offset.style.visibility=side.style.visibility="visible",offset.style.opacity=RecalculateState.center&&SideState.id!==null?"0":"1",id==="search"){const keyword=document.getElementById("keyword"),inputTrigger=document.getElementById("input-trigger");inputTrigger.onclick=()=>{keyword.focus()},keyword.onkeyup=()=>{renderSearch(keyword.value)},keyword.focus()}},sideClick=id=>{sideSet(id)},toolSideClick=id=>{sideSet(`tool-${id}`)},categorySideClick=id=>{sideSet(`category-${id}`)},sideClose=()=>{sideSet(null)},sideSet=id=>{if(setTransitionDuration(),DATA.page_type==="tool"&&(changeMajor.style.opacity=id===null?"1":"0",changeMajor.style.pointerEvents=id===null?"all":"none"),id===null){SideState.id=null,sideMove(!1),sideChange(null);return}SideState.on?SideState.id===id?sideSet(null):(SideState.id=id,sideChange(null)):(SideState.id=id,sideMove(!0),sideChange(SideState.id))};side.ontransitionend=e=>{e.propertyName==="opacity"&&(offset.style.visibility=offset.style.opacity==="0"?"hidden":"visible",side.style.visibility=side.style.opacity==="0"?"hidden":"visible",side.style.opacity==="0"&&SideState.id!==null&&sideChange(SideState.id))};const cloneTemplate=template=>document.getElementById(template).content.cloneNode(!0),renderSide=id=>{if(clear(side),id.startsWith("tool-")&&DATA.page_type==="tool"){const name=id.substring(5),index=DATA.tool.index[name],cross=DATA.tool.cross[name],list=[...index.list,...index.cross_list],single=list.length===1;side.appendChild(cloneTemplate("side-tools-base"));const title=side.getElementsByClassName("title")[0];title.innerText=single?"\u8BE6\u60C5":index.title;const content2=side.getElementsByClassName("content")[0];for(const tool of list){const item=cloneTemplate(`tool-${tool}`).firstElementChild,cross_notice=cross==null?void 0:cross[tool];if(cross_notice!==void 0){const p=document.createElement("p");p.innerHTML=cross_notice,item.getElementsByClassName("detail")[0].appendChild(p)}content2.appendChild(item)}single&&showDetail(side.getElementsByClassName("item")[0])}else if(id.startsWith("category-")&&DATA.page_type==="tool"){const name=id.substring(9),category=DATA.tool.category[name],list=category.list,single=list.length===1;side.appendChild(cloneTemplate("side-tools-base"));const title=side.getElementsByClassName("title")[0];title.innerText=single?"\u8BE6\u60C5":category.title;const content2=side.getElementsByClassName("content")[0];for(const tool of list){const item=cloneTemplate(`tool-${tool}`).firstElementChild;content2.appendChild(item)}single&&showDetail(side.getElementsByClassName("item")[0])}else side.appendChild(cloneTemplate(`side-${id}`))},renderSearch=keywordText=>{if(DATA.page_type==="tool"){const all=DATA.tool.all,content2=document.getElementById("search-content");clear(content2);for(const tool of Object.keys(all))tool.toLowerCase().includes(keywordText.toLowerCase())&&content2.appendChild(cloneTemplate(`tool-${all[tool]}`))}},recalculate=()=>{body.clientWidth>800?layoutMode=0:body.clientWidth>500?layoutMode=1:layoutMode=2;let scaleW,scaleH;layoutMode===0?(scaleW=body.clientWidth/1056,scaleH=body.clientHeight/900):(scaleH=body.clientHeight/800,layoutMode===1?scaleW=body.clientWidth/600:scaleW=body.clientWidth/450),body.style.fontSize=`${Math.min(scaleH,scaleW)}em`;const delta_major=body.clientWidth-major.clientWidth,delta_side=body.clientWidth-side.clientWidth,delta=body.clientWidth-major.clientWidth-side.clientWidth;delta_major<0?RecalculateState.sidePosition=body.clientWidth:RecalculateState.sidePosition=major.clientWidth+delta_major/2,RecalculateState.center=!1,delta>0?RecalculateState.distance=major.offsetLeft-delta/2:major.className==="wide"&&delta_major<1?(RecalculateState.center=!0,RecalculateState.distance=side.clientWidth+delta_side/2):delta_side<200?(RecalculateState.center=!0,RecalculateState.distance=major.clientWidth+(-major.clientWidth+side.clientWidth)/2):RecalculateState.distance=-delta+major.offsetLeft,setTransitionDuration(0),positionSet(),SideState.on&&(offset.style.opacity=RecalculateState.center?"0":"1",offset.style.visibility=offset.style.opacity==="0"?"hidden":"visible")};window.onresize=()=>{recalculate()};const showDetail=e=>{const content2=e.getElementsByClassName("detail-container")[0],icon=e.getElementsByClassName("icon-line")[0],height=e.getElementsByClassName("detail")[0].clientHeight;content2.style.height===""&&(content2.style.height="0px"),content2.style.height==="100%"&&(content2.style.transitionDuration=".01s",content2.style.height=`${height}px`,content2.ontransitionend=()=>{content2.style.transitionDuration=".3s",content2.style.height="0px"},icon.style.transform="rotate(0deg)"),content2.style.height==="0px"&&(content2.style.transitionDuration=".3s",content2.style.height=`${height}px`,content2.ontransitionend=()=>{content2.style.height="100%"},icon.style.transform="rotate(90deg)")},initCategory=()=>{const tool_button=document.getElementById("tool-button"),link_button=document.getElementById("link-button"),tool_list=document.getElementById("tool-list"),link_list=document.getElementById("link-list");tool_button.className="selected",link_list.style.opacity="0",link_list.style.pointerEvents="none",tool_list.onclick=link_list.onclick=e=>{(e.composedPath()[0]===tool_list||e.composedPath()[0]===link_list)&&sideClose()},tool_button.onclick=e=>{e.stopPropagation(),tool_list.style.opacity="1",tool_list.style.pointerEvents="all",link_list.style.opacity="0",link_list.style.pointerEvents="none",link_button.classList.remove(),tool_button.className="selected",link_button.className=""},link_button.onclick=e=>{e.stopPropagation(),tool_list.style.opacity="0",tool_list.style.pointerEvents="none",link_list.style.opacity="1",link_list.style.pointerEvents="all",tool_button.className="",link_button.className="selected"}},changeMajorAction=()=>{clear(major);const nextId=MajorState.id==="tiles"?"category":"tiles";major.appendChild(cloneTemplate(`major-${nextId}`)),major.className=nextId==="tiles"?"wide":"normal",nextId==="category"&&initCategory(),MajorState.id=nextId},setBackground=url=>{background.style.backgroundImage=`url(${url})`},defaultBackground=()=>`//ldtstore-intl-asserts.pages.dev/image/bg/${Math.floor(Math.random()*7)}.webp`,backDefault=()=>{location.href=`//r.ldtstore.com.cn/r/${{home:"fw-back-main",tool:"fw-back-ldtools"}[DATA.page_type]}`};window.copy=copy;window.side=sideClick;window.tool=toolSideClick;window.category=categorySideClick;window.backDefault=backDefault;DATA.page_type==="tool"&&(window.detail=showDetail);setBackground(defaultBackground());recalculate();})();