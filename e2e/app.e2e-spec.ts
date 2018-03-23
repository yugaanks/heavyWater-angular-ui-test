import { HwVodPage } from './app.po';

describe('hw-vod App', () => {
  let page: HwVodPage;

  beforeEach(() => {
    page = new HwVodPage();
  });

  it('should have right title', () => {
    page.navigateTo();
    page.getPageTitle().then((title: string)=>{
    	expect(title).toEqual('UCS-VOD');	
    });
  });

  it('check login', ()=>{
  	page.navigateTo();
  	page.login().then((ele)=>{
		expect(ele).toBe(true);
  	}).catch((err)=>{
  		//console.log(err);
  	});
  	

  });
});
