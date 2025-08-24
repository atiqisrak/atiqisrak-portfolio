import { KnowledgeBaseService } from './src/services/knowledgeBase';

async function testFocusedResponse() {
  try {
    console.log('Testing focused response functionality...\n');
    
    // Test focused response for project query
    const projectResponse = await KnowledgeBaseService.getFocusedResponse("new project");
    console.log('Project Query Response:');
    console.log(projectResponse);
    console.log('\n---\n');
    
    // Test focused response for skill query
    const skillResponse = await KnowledgeBaseService.getFocusedResponse("React skills");
    console.log('Skill Query Response:');
    console.log(skillResponse);
    console.log('\n---\n');
    
    // Test contextual response (should now be focused)
    const contextualResponse = await KnowledgeBaseService.getContextualResponse("new project");
    console.log('Contextual Response (should be focused):');
    console.log(contextualResponse);
    
    console.log('\n✅ Focused response test completed!');
    
  } catch (error) {
    console.error('❌ Error testing focused response:', error);
  }
}

testFocusedResponse();
