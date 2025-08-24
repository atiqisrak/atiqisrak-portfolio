# Knowledge Base System

This system allows you to feed your portfolio data to AI for intelligent responses and semantic search capabilities.

## 🏗️ Architecture

### Components

1. **`knowledge-base.json`** - Your structured portfolio data
2. **`KnowledgeBaseService`** - Service layer for AI operations
3. **API Endpoints** - REST endpoints for frontend integration
4. **Vector Embeddings** - AI-powered semantic search

## 🚀 How It Works

### 1. Data Structure

Your knowledge base contains:

- **Projects**: Detailed project information with challenges, solutions, and impact
- **Skills**: Categorized skills with proficiency levels and use cases
- **Experience**: Work history and achievements
- **Methodologies**: Development approaches and processes
- **Expertise**: Domain knowledge and specializations

### 2. AI Integration

- **Embeddings**: Each piece of content gets converted to AI vectors
- **Semantic Search**: AI finds relevant content based on meaning, not just keywords
- **Contextual Responses**: AI generates intelligent responses using your knowledge

## 📡 API Endpoints

### Knowledge Base Search

```bash
POST /api/portfolio/knowledge/search
{
  "query": "Tell me about React projects",
  "limit": 5,
  "threshold": 0.7
}
```

### Contextual Response

```bash
POST /api/portfolio/knowledge/contextual-response
{
  "query": "What are your strongest skills?"
}
```

### Get Projects

```bash
GET /api/portfolio/knowledge/projects
GET /api/portfolio/knowledge/projects/{id}
```

### Get Skills

```bash
GET /api/portfolio/knowledge/skills/{category}
# categories: frontend, backend, ai_ml, devops
```

### Get Personal Info

```bash
GET /api/portfolio/knowledge/personal-info
```

### Refresh Knowledge Base

```bash
POST /api/portfolio/knowledge/refresh
```

## 🔧 Usage Examples

### Frontend Integration

```typescript
// Search knowledge base
const searchKnowledge = async (query: string) => {
  const response = await fetch("/api/portfolio/knowledge/search", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ query, limit: 5, threshold: 0.7 }),
  });
  return response.json();
};

// Get contextual response
const getContextualResponse = async (query: string) => {
  const response = await fetch("/api/portfolio/knowledge/contextual-response", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ query }),
  });
  return response.json();
};
```

### AI Chat Integration

```typescript
// Use in your AI chat system
const handleUserQuery = async (userMessage: string) => {
  // Search knowledge base for relevant information
  const searchResults = await searchKnowledge(userMessage);

  // Get contextual response
  const aiResponse = await getContextualResponse(userMessage);

  // Combine with your AI logic
  return {
    knowledgeResults: searchResults,
    contextualResponse: aiResponse.response,
    // Add your AI-generated content here
  };
};
```

## 📝 Adding New Data

### 1. Update JSON File

Add new projects, skills, or experience to `knowledge-base.json`:

```json
{
  "projects": {
    "new-project": {
      "id": "new-project",
      "title": "New Project Title",
      "overview": "Project description...",
      "challenge": "What was the challenge?",
      "solution": "How did you solve it?",
      "impact": ["Metric 1", "Metric 2"],
      "technicalDetails": {
        "technologies": ["Tech1", "Tech2"],
        "architecture": ["Arch1", "Arch2"]
      }
    }
  }
}
```

### 2. Refresh Knowledge Base

After updating the JSON file, call the refresh endpoint:

```bash
POST /api/portfolio/knowledge/refresh
```

This will:

- Reload the JSON data
- Generate new embeddings for new content
- Update the search index

## 🧪 Testing

Run the test script to verify everything works:

```bash
cd backend
npm run build
node dist/test-knowledge-base.js
```

## 🔍 How AI Uses Your Data

### 1. **Semantic Understanding**

- AI understands the meaning behind queries, not just keywords
- "React skills" finds React-related content even if "React" isn't explicitly mentioned

### 2. **Context-Aware Responses**

- AI generates responses based on your actual portfolio data
- Provides specific examples from your projects and experience

### 3. **Intelligent Recommendations**

- Suggests relevant projects based on user interests
- Matches skills to project requirements

## 🚀 Benefits

1. **Consistent Information**: All AI responses use your official portfolio data
2. **Up-to-Date**: Easy to update by modifying the JSON file
3. **Scalable**: Add unlimited projects, skills, and experience
4. **AI-Powered**: Semantic search finds relevant content automatically
5. **Business-Focused**: AI explains technical solutions in business terms

## 🔧 Configuration

### Environment Variables

Ensure your OpenAI API key is set:

```bash
OPENAI_API_KEY=your_api_key_here
```

### Embedding Model

The system uses OpenAI's text-embedding-ada-002 model for generating embeddings.

## 📊 Performance

- **Initial Load**: ~2-3 seconds (generates embeddings)
- **Search Queries**: ~100-200ms
- **Memory Usage**: ~50-100MB (depends on content size)

## 🆘 Troubleshooting

### Common Issues

1. **Knowledge base not loading**

   - Check file path: `backend/knowledge-base.json`
   - Verify JSON syntax is valid

2. **Embeddings not generating**

   - Check OpenAI API key
   - Verify API quota and limits

3. **Search not working**
   - Call refresh endpoint after updates
   - Check similarity threshold (0.7 is default)

### Debug Mode

Enable detailed logging by setting:

```bash
DEBUG=true
```

## 🔮 Future Enhancements

- **Real-time Updates**: Webhook-based updates
- **Multi-language Support**: Internationalization
- **Advanced Analytics**: Usage metrics and insights
- **Custom Embeddings**: Fine-tuned models for your domain
- **Integration APIs**: Connect with external systems

---

Your knowledge base is now ready to power intelligent AI responses about your portfolio! 🎉
