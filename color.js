
const slides = [
  {tab:'本檔活動', label:'SHINYSUN OUTLET · TAICHUNG', title:'好買的，\n就在日曜。', description:'在台中公園旁，逛逛國際名品、運動休閒與日常好物。', cta:'看本檔優惠', target:'#offers', image:'https://www.s-outlet.com.tw/_upload/htmlEdit/1%2884%29.jpg', alt:'日曜天地中庭光盒子', caption:'日曜天地・光的聚落'},
  {tab:'品牌樓層', label:'FIND YOUR FAVORITES', title:'你的愛牌，\n這一層找。', description:'依品牌名稱、類別或樓層找櫃位，出發前先做好功課。', cta:'查看品牌與樓層', target:'#directory', image:'https://www.s-outlet.com.tw/_upload/htmlEdit/2%2862%29.jpg', alt:'日曜天地商場內部', caption:'日曜天地・商場空間'},
  {tab:'逛街小歇', label:'FOOD & COFFEE', title:'逛累了，\n吃點好的。', description:'一杯咖啡、一碗粥或一桌鍋物，在購物行程裡留點時間。', cta:'找餐廳', target:'#dining', image:'https://www.s-outlet.com.tw/_upload/htmlEdit/20230630220808_90.jpg', alt:'上澄鍋物餐點', caption:'上澄鍋物・2F'}
];
const slideTabs = document.getElementById('slide-tabs');
const stage = document.getElementById('stage');
const stagePhoto = document.getElementById('stage-photo');
const stageTitle = document.getElementById('stage-title');
const stageCta = document.getElementById('stage-cta');
const selectedOffer = visibleOffers.find(item => item.featured);
if (selectedOffer) {
  slides[0].description = selectedOffer.title + '｜' + dateLabel(selectedOffer);
}
slides.forEach((slide,index) => {
  const tab = document.createElement('button');
  tab.type = 'button';
  tab.setAttribute('role','tab');
  tab.setAttribute('aria-controls','stage');
  tab.id = 'slide-' + index;
  tab.textContent = slide.tab;
  tab.addEventListener('click', () => setSlide(index));
  tab.addEventListener('keydown', event => {
    const keys = {ArrowLeft:(index+2)%3, ArrowRight:(index+1)%3, Home:0, End:2};
    if (!(event.key in keys)) return;
    event.preventDefault();
    setSlide(keys[event.key]);
    slideTabs.children[keys[event.key]].focus();
  });
  slideTabs.append(tab);
});
function setSlide(index) {
  const slide = slides[index];
  stage.className = 'stage tone-' + index;
  stage.setAttribute('aria-labelledby','slide-' + index);
  document.getElementById('stage-kicker').textContent = slide.label;
  stageTitle.replaceChildren(slide.title.split('\n')[0], document.createElement('br'), slide.title.split('\n')[1]);
  document.getElementById('stage-description').textContent = slide.description;
  stageCta.href = slide.target;
  stageCta.textContent = slide.cta;
  stagePhoto.hidden = false;
  stagePhoto.alt = slide.alt;
  if (stagePhoto.getAttribute('src') !== slide.image) stagePhoto.src = slide.image;
  else if (stagePhoto.complete && !stagePhoto.naturalWidth) stagePhoto.hidden = true;
  document.getElementById('stage-caption').textContent = slide.caption;
  Array.from(slideTabs.children).forEach((tab,i) => {
    tab.tabIndex = i === index ? 0 : -1;
    tab.setAttribute('aria-selected',String(i === index));
  });
}
stagePhoto.addEventListener('error',() => { stagePhoto.hidden = true; });
setSlide(0);
const floorTabs = document.getElementById('floor-tabs');
['','B2F','B1F','1F','2F'].forEach(floor => {
  const button = document.createElement('button');
  button.type = 'button';
  button.dataset.floor = floor;
  button.textContent = floor || '全樓層';
  button.addEventListener('click',() => {
    brandFloor.value = floor;
    brandFloor.dispatchEvent(new Event('change'));
  });
  floorTabs.append(button);
});
function syncFloors(){
  Array.from(floorTabs.children).forEach(button => button.setAttribute('aria-pressed',String(button.dataset.floor === brandFloor.value)));
}
brandFloor.addEventListener('change',syncFloors);
document.getElementById('reset').addEventListener('click',syncFloors);
syncFloors();
