import { getApplication, updateApplication, deleteApplication } from '@/lib/store';

export const dynamic = 'force-dynamic';

export async function GET(request, { params }) {
  const { id } = await params;
  const app = getApplication(id);
  if (!app) {
    return Response.json({ error: 'Not found' }, { status: 404 });
  }
  return Response.json(app);
}

export async function PUT(request, { params }) {
  const { id } = await params;
  const data = await request.json();
  const app = updateApplication(id, data);
  if (!app) {
    return Response.json({ error: 'Not found' }, { status: 404 });
  }
  return Response.json(app);
}

export async function DELETE(request, { params }) {
  const { id } = await params;
  const deleted = deleteApplication(id);
  if (!deleted) {
    return Response.json({ error: 'Not found' }, { status: 404 });
  }
  return Response.json({ success: true });
}
