const handleSubmit = require('./app');
import { getLocation } from './app';


describe('Testing app.js', () => {
  it('Should show handleSubmit is defined', () => {
    expect(handleSubmit).toBeDefined();
  });
  
  it('Should return an Object from getLocation', async () => {
    const results = await getLocation;
    expect(results).toBeInstanceOf(Object);
  })
})
