import { getApplications, createApplication } from '@/lib/store';

export const dynamic = 'force-dynamic';

export async function GET() {
  const apps = getApplications();
  return Response.json(apps);
}

export async function POST(request) {
  const data = await request.json();
  const app = createApplication(data);
  return Response.json(app, { status: 201 });
}
