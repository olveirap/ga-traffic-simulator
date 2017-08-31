'use strict';
const Modifier = require('./modifier.js');
const _ = require('underscore');

/**
 * Generates hits to be sent to Google Analytics
 */
class TrafficGenerator{
  /**
   * Initializes the RTG
   * @param  {Object} config      configures the hits
   * @param  {Array}  modifiers   modifiers change the hits to simulate whatever types of traffic is necessary
   */
  constructor(config, modifiers) {
    modifiers = modifiers || [];
    let lenOfArrays = [config.host, config.title, config.path].filter((curr)=>{return Array.isArray(curr)}).length;
    let consistentConfig = lenOfArrays == 0 || lenOfArrays == 3;
    if(!config || typeof config !== 'object' || !Array.isArray(modifiers) || !consistentConfig){
       console.log("config exists? "+config);
      console.log("typeof config? "+typeof config);
      console.log("!Array.isArray(modifiers)? " +!Array.isArray(modifiers));
      console.log("consistent config? " +consistentConfig);
      throw new Error('Invalid inputs.');
     
    }
    if(lenOfArrays == 0) {
        this.defaultHit = {
            dh: config.host,
            dt: config.title,
            dp: config.path
        };
    }else{
        this.defaultHit = [];
        for(var i=0; i<config.host.length; i++){
            this.defaultHit.push({
                dh: config.host[i],
                dt: config.title[i],
                dp: config.path[i]
            });
        }
    }

    // Ensure there is always at least one modifier
    modifiers.push(new Modifier(config));
    this.modifiers = modifiers;
    return this;
  }
  /**
   * Adds a modifier that will be used when generating hits
   * @param {Modifier<Object>} modifier
   */
  addModifier(modifier) {
    this.modifiers.push(modifier);
  }
  /**
   * Generates the numberOfHits requested, modifying each based on the modifiers set.
   * @param  {Number} numberofHits
   * @return {Array}                Array of hits
   */
  generate(numberofHits) {
    if(typeof numberofHits !== 'number'){
      throw new Error('Invalid value for count');
    }
    let hits = [];
    const self = this;

    if(Array.isArray(self.defaultHit)){
      for(let i = 0; i < numberofHits; i++){
        for(let j = 0; j < self.defaultHit.length; j++){
          let modifiedHit = self.modifiers.reduce((prev, curr, index) => {
            return self.modifiers[index].modify(prev);
          }, _.clone(self.defaultHit[j]));

          hits.push(modifiedHit);
        }
      }
    }
    else{
      for(let i = 0; i < numberofHits; i++){
        let modifiedHit = self.modifiers.reduce((prev, curr, index) => {
          return self.modifiers[index].modify(prev);
        }, _.clone(self.defaultHit));

        hits.push(modifiedHit);
      }
    }
    return hits;
  }
}

module.exports = TrafficGenerator;
