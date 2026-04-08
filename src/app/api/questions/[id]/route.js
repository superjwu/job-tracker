import { deleteQuestion, updateQuestion } from '@/lib/store';

export const dynamic = 'force-dynamic';

export async function PUT(request, { params }) {
  const { id } = await params;
  const data = await request.json();
  const question = updateQuestion(id, data);
  if (!question) {
    return Response.json({ error: 'Not found' }, { status: 404 });
  }
  return Response.json(question);
}

export async function DELETE(request, { params }) {
  const { id } = await params;
  const deleted = deleteQuestion(id);
  if (!deleted) {
    return Response.json({ error: 'Not found' }, { status: 404 });
  }
  return Response.json({ success: true });
}
