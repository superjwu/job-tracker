import {
  getApplications,
  getApplication,
  createApplication,
  updateApplication,
  deleteApplication,
  getQuestions,
  createQuestion,
  updateQuestion,
  deleteQuestion,
} from '@/lib/store';

export const dynamic = 'force-dynamic';

// Single catch-all API handler — ensures all routes share the same
// serverless function on Vercel so in-memory state is consistent.

export async function GET(request, { params }) {
  const { path } = await params;
  const route = path.join('/');

  // GET /api/applications
  if (route === 'applications') {
    return Response.json(getApplications());
  }

  // GET /api/applications/:id
  if (path[0] === 'applications' && path.length === 2) {
    const app = getApplication(path[1]);
    if (!app) return Response.json({ error: 'Not found' }, { status: 404 });
    return Response.json(app);
  }

  // GET /api/questions
  if (route === 'questions') {
    return Response.json(getQuestions());
  }

  return Response.json({ error: 'Not found' }, { status: 404 });
}

export async function POST(request, { params }) {
  const { path } = await params;
  const route = path.join('/');
  const data = await request.json();

  // POST /api/applications
  if (route === 'applications') {
    return Response.json(createApplication(data), { status: 201 });
  }

  // POST /api/questions
  if (route === 'questions') {
    return Response.json(createQuestion(data), { status: 201 });
  }

  return Response.json({ error: 'Not found' }, { status: 404 });
}

export async function PUT(request, { params }) {
  const { path } = await params;
  const data = await request.json();

  // PUT /api/applications/:id
  if (path[0] === 'applications' && path.length === 2) {
    const app = updateApplication(path[1], data);
    if (!app) return Response.json({ error: 'Not found' }, { status: 404 });
    return Response.json(app);
  }

  // PUT /api/questions/:id
  if (path[0] === 'questions' && path.length === 2) {
    const q = updateQuestion(path[1], data);
    if (!q) return Response.json({ error: 'Not found' }, { status: 404 });
    return Response.json(q);
  }

  return Response.json({ error: 'Not found' }, { status: 404 });
}

export async function DELETE(request, { params }) {
  const { path } = await params;

  // DELETE /api/applications/:id
  if (path[0] === 'applications' && path.length === 2) {
    const deleted = deleteApplication(path[1]);
    if (!deleted) return Response.json({ error: 'Not found' }, { status: 404 });
    return Response.json({ success: true });
  }

  // DELETE /api/questions/:id
  if (path[0] === 'questions' && path.length === 2) {
    const deleted = deleteQuestion(path[1]);
    if (!deleted) return Response.json({ error: 'Not found' }, { status: 404 });
    return Response.json({ success: true });
  }

  return Response.json({ error: 'Not found' }, { status: 404 });
}
