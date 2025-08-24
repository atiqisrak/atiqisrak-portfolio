import { KnowledgeBaseService } from './src/services/knowledgeBase';

async function testKnowledgeBase() {
  try {
    console.log('🧠 Testing Knowledge Base Service...\n');

    // Test 1: Load knowledge base
    console.log('1. Loading knowledge base...');
    const kb = await KnowledgeBaseService.loadKnowledgeBase();
    console.log(`✓ Loaded knowledge base with ${kb.metadata.totalProjects} projects\n`);

    // Test 2: Get personal info
    console.log('2. Getting personal information...');
    const personalInfo = await KnowledgeBaseService.getPersonalInfo();
    console.log(`✓ ${personalInfo.name} - ${personalInfo.title}\n`);

    // Test 3: Get all projects
    console.log('3. Getting all projects...');
    const projects = await KnowledgeBaseService.getAllProjects();
    console.log(`✓ Found ${projects.length} projects\n`);

    // Test 4: Search knowledge base
    console.log('4. Searching for "React" skills...');
    const searchResults = await KnowledgeBaseService.searchKnowledge('React skills', 3, 0.6);
    console.log(`✓ Found ${searchResults.length} relevant results:`);
    searchResults.forEach((result, index) => {
      console.log(`   ${index + 1}. ${result.type}: ${result.id} (similarity: ${result.similarity.toFixed(3)})`);
    });
    console.log('');

    // Test 5: Get contextual response
    console.log('5. Getting contextual response for "Tell me about your AI projects"...');
    const response = await KnowledgeBaseService.getContextualResponse('Tell me about your AI projects');
    console.log('✓ Contextual Response:');
    console.log(response);
    console.log('');

    // Test 6: Get skills by category
    console.log('6. Getting frontend skills...');
    const frontendSkills = await KnowledgeBaseService.getSkillsByCategory('frontend');
    console.log(`✓ Found ${frontendSkills.length} frontend skills:`);
    frontendSkills.forEach(skill => {
      console.log(`   - ${skill.name}: ${skill.proficiency}% proficiency`);
    });

    console.log('\n🎉 Knowledge base testing completed successfully!');

  } catch (error) {
    console.error('❌ Knowledge base testing failed:', error);
  }
}

// Run the test
testKnowledgeBase();
