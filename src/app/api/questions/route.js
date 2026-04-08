import { getQuestions, createQuestion, deleteQuestion } from '@/lib/store';

export const dynamic = 'force-dynamic';

export async function GET() {
  const questions = getQuestions();
  return Response.json(questions);
}

export async function POST(request) {
  const data = await request.json();
  const question = createQuestion(data);
  return Response.json(question, { status: 201 });
}

export async function DELETE(request) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get('id');
  if (!id) {
    return Response.json({ error: 'Missing id parameter' }, { status: 400 });
  }
  const deleted = deleteQuestion(id);
  if (!deleted) {
    return Response.json({ error: 'Not found' }, { status: 404 });
  }
  return Response.json({ success: true });
}
