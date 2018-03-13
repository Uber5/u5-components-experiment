import doGreatStuff from './doGreatStuff'

describe('doGreatStuff', () => {
  it('answers everything', () => {
    expect(doGreatStuff()).toBe(42)
  })
})
