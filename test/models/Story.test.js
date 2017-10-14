const { expect } = require('chai');
const sinon = require('sinon');
require('sinon-mongoose');

const Story = require('../../app/models/Story');

describe('Story Model', () => {
   it('should create a new story', (done) => {
       const StoryMock = sinon.mock(new Story({ title: 'Story test'}));
       const story = StoryMock.object;

       StoryMock
       .expects('save')
       .yields(null);

       story.save((err) => {
           StoryMock.verify();
           StoryMock.restore();
           expect(err).to.be.null;
           done();
       });
   });


   it('should find story by title', (done) => {
       const storyMock = sinon.mock(Story);
       const expectedStory = {
           title: 'Story test'
       };

       storyMock
       .expects('findOne')
       .withArgs({ title: 'Story test' })
       .yields(null, expectedStory);

       Story.findOne({ title: 'Story test' }, (err, result) => {
           storyMock.verify();
           storyMock.restore();
           expect(result.title).to.equal('Story test');
           done();
       });
   });


   it('should remove story by title', (done) => {
       const storyMock = sinon.mock(Story);
       const expectedResult = {
           nRemoved: 1
       };

       storyMock
       .expects('remove')
       .withArgs({ title: 'Story test' })
       .yields(null, expectedResult);

       Story.remove({ title: 'Story test' }, (err, result) => {
           storyMock.verify();
           storyMock.restore();
           expect(err).to.be.null;
           expect(result.nRemoved).to.equal(1);
           done();
       });
   });

});
