
const request = require('supertest');
const app = require('./server');

 
let appServer;

beforeEach(() => { appServer = app.listen(8080, () => console.log(`Listening at port 8080`)) });

afterEach(async () => {
  await appServer.close() // avoid jest open handle error
});


describe('GET endpoints', () => {
  it('Should get the name of a city', async (done) => {
    const res = await request(app).get('/geoNames?location=Dallas');

    expect(res.statusCode).toEqual(200);
    expect(JSON.parse(res.text).name).toEqual('Dallas');
    done();
  });
  
  it('Should get an error because there are no image results matched', async (done) => {
    const res = await request(app).get('/photo?location=Gibberish1lkegjnb');

    expect(res.statusCode).toEqual(200);
    expect(JSON.parse(res.text).error).toEqual('No Results');
    done();
  });

  it('Should get an image url from pixabay', async (done) => {
    const res = await request(app).get('/photo?location=Dallas');

    expect(res.statusCode).toEqual(200);
    expect(res.text).toContain('https://pixabay.com/get/');
    done();
  });
})
