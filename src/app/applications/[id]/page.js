'use client';

import { useState, useEffect, use } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import StatusBadge from '@/components/StatusBadge';
import ChecklistItem from '@/components/ChecklistItem';
import { useToast } from '@/components/Toast';
import { STATUSES, STATUS_LABELS } from '@/lib/constants';

export default function ApplicationDetail({ params }) {
  const { id } = use(params);
  const router = useRouter();
  const toast = useToast();
  const [app, setApp] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [notesSaved, setNotesSaved] = useState(false);
  const [notes, setNotes] = useState('');
  const [editing, setEditing] = useState(false);
  const [editForm, setEditForm] = useState({});

  useEffect(() => {
    async function load() {
      try {
        const res = await fetch(`/api/applications/${id}`);
        if (!res.ok) throw new Error('Not found');
        const data = await res.json();
        setApp(data);
        setNotes(data.notes || '');
        setEditForm({
          company: data.company,
          role: data.role,
          dateApplied: data.dateApplied,
          url: data.url,
          salary: data.salary,
          location: data.location,
        });
      } catch {
        toast.error('Failed to load application');
      } finally {
        setLoading(false);
      }
    }
    load();
  }, [id]);

  async function updateApp(updates, silent = false) {
    setSaving(true);
    try {
      const res = await fetch(`/api/applications/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updates),
      });
      if (!res.ok) throw new Error('Failed to update');
      const updated = await res.json();
      setApp(updated);
      setNotes(updated.notes || '');
      if (!silent) toast.success('Updated');
    } catch {
      toast.error('Failed to save changes');
    } finally {
      setSaving(false);
    }
  }

  async function handleStatusChange(newStatus) {
    await updateApp({ status: newStatus });
  }

  async function handleChecklistChange(key, value) {
    await updateApp({ checklist: { [key]: value } }, true);
  }

  async function handleNotesBlur() {
    if (notes !== (app?.notes || '')) {
      await updateApp({ notes }, true);
      setNotesSaved(true);
      setTimeout(() => setNotesSaved(false), 2000);
    }
  }

  async function handleEditSave() {
    await updateApp(editForm);
    setEditing(false);
  }

  async function handleDelete() {
    if (!confirm('Are you sure you want to delete this application?')) return;
    try {
      const res = await fetch(`/api/applications/${id}`, { method: 'DELETE' });
      if (!res.ok) throw new Error('Failed to delete');
      toast.success('Application deleted');
      router.push('/applications');
    } catch {
      toast.error('Failed to delete application');
    }
  }

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="animate-pulse space-y-6">
          <div className="h-6 bg-gray-200 rounded w-32" />
          <div className="h-10 bg-gray-200 rounded w-64" />
          <div className="h-48 bg-gray-200 rounded-xl" />
        </div>
      </div>
    );
  }

  if (!app) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 text-center">
        <h1 className="text-2xl font-bold text-gray-900">Application Not Found</h1>
        <p className="text-gray-600 mt-2">This application may have been deleted.</p>
        <Link href="/applications" className="text-indigo-600 hover:text-indigo-700 mt-4 inline-block">
          Back to Applications
        </Link>
      </div>
    );
  }

  const checklistKeys = Object.keys(app.checklist);
  const checklistDone = checklistKeys.filter((k) => app.checklist[k]).length;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="mb-6">
        <Link href="/applications" className="text-sm text-indigo-600 hover:text-indigo-700 flex items-center gap-1">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Back to Applications
        </Link>
      </div>

      <div className="flex items-start justify-between gap-4 mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">{app.company}</h1>
          <p className="text-lg text-gray-600 mt-1">{app.role}</p>
        </div>
        <div className="flex items-center gap-2 shrink-0">
          <StatusBadge status={app.status} size="lg" />
          {saving && <span className="text-xs text-gray-400">Saving...</span>}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          {/* Details Card */}
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-gray-900">Details</h2>
              <button onClick={() => setEditing(!editing)}
                className="text-sm text-indigo-600 hover:text-indigo-700 font-medium">
                {editing ? 'Cancel' : 'Edit'}
              </button>
            </div>
            {editing ? (
              <div className="space-y-3">
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-medium text-gray-500 mb-1">Company</label>
                    <input type="text" value={editForm.company}
                      onChange={(e) => setEditForm({ ...editForm, company: e.target.value })}
                      className="w-full rounded-lg border border-gray-300 px-3 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500" />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-gray-500 mb-1">Role</label>
                    <input type="text" value={editForm.role}
                      onChange={(e) => setEditForm({ ...editForm, role: e.target.value })}
                      className="w-full rounded-lg border border-gray-300 px-3 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500" />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-gray-500 mb-1">Date Applied</label>
                    <input type="date" value={editForm.dateApplied}
                      onChange={(e) => setEditForm({ ...editForm, dateApplied: e.target.value })}
                      className="w-full rounded-lg border border-gray-300 px-3 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500" />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-gray-500 mb-1">Salary</label>
                    <input type="text" value={editForm.salary}
                      onChange={(e) => setEditForm({ ...editForm, salary: e.target.value })}
                      className="w-full rounded-lg border border-gray-300 px-3 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500" />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-gray-500 mb-1">Location</label>
                    <input type="text" value={editForm.location}
                      onChange={(e) => setEditForm({ ...editForm, location: e.target.value })}
                      className="w-full rounded-lg border border-gray-300 px-3 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500" />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-gray-500 mb-1">Job URL</label>
                    <input type="url" value={editForm.url}
                      onChange={(e) => setEditForm({ ...editForm, url: e.target.value })}
                      className="w-full rounded-lg border border-gray-300 px-3 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500" />
                  </div>
                </div>
                <button onClick={handleEditSave}
                  className="bg-indigo-600 text-white px-4 py-1.5 rounded-lg text-sm font-medium hover:bg-indigo-700 transition-colors">
                  Save Changes
                </button>
              </div>
            ) : (
              <dl className="grid grid-cols-2 gap-4 text-sm">
                {app.dateApplied && (
                  <div>
                    <dt className="text-gray-500 text-xs">Date Applied</dt>
                    <dd className="text-gray-900 mt-0.5">{app.dateApplied}</dd>
                  </div>
                )}
                {app.salary && (
                  <div>
                    <dt className="text-gray-500 text-xs">Salary</dt>
                    <dd className="text-gray-900 mt-0.5">{app.salary}</dd>
                  </div>
                )}
                {app.location && (
                  <div>
                    <dt className="text-gray-500 text-xs">Location</dt>
                    <dd className="text-gray-900 mt-0.5">{app.location}</dd>
                  </div>
                )}
                {app.url && (
                  <div>
                    <dt className="text-gray-500 text-xs">Job URL</dt>
                    <dd className="mt-0.5">
                      <a href={app.url} target="_blank" rel="noopener noreferrer"
                        className="text-indigo-600 hover:text-indigo-700 truncate block">
                        {app.url}
                      </a>
                    </dd>
                  </div>
                )}
              </dl>
            )}
          </div>

          {/* Company Research Notes */}
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-3">
              <h2 className="text-lg font-semibold text-gray-900">Company Research Notes</h2>
              {notesSaved && (
                <span className="text-xs text-green-600 font-medium">Saved</span>
              )}
            </div>
            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              onBlur={handleNotesBlur}
              rows={6}
              className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent resize-y"
              placeholder="Add notes about the company: culture, tech stack, interview process, contacts..."
            />
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-3">Status</h2>
            <div className="space-y-1.5">
              {STATUSES.map((status) => (
                <button key={status} onClick={() => handleStatusChange(status)}
                  className={`w-full text-left px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                    app.status === status
                      ? 'bg-indigo-50 text-indigo-700 ring-1 ring-indigo-200'
                      : 'text-gray-600 hover:bg-gray-50'
                  }`}>
                  {STATUS_LABELS[status]}
                </button>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-3">
              <h2 className="text-lg font-semibold text-gray-900">Prep Checklist</h2>
              <span className="text-xs text-gray-500">{checklistDone}/{checklistKeys.length}</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2 mb-3">
              <div className="bg-indigo-600 h-2 rounded-full transition-all"
                style={{ width: `${(checklistDone / checklistKeys.length) * 100}%` }} />
            </div>
            <div className="space-y-0.5">
              {checklistKeys.map((key) => (
                <ChecklistItem key={key} itemKey={key} checked={app.checklist[key]}
                  onChange={handleChecklistChange} />
              ))}
            </div>
          </div>

          <button onClick={handleDelete}
            className="w-full text-center px-4 py-2 rounded-lg text-sm font-medium text-red-600 border border-red-200 hover:bg-red-50 transition-colors">
            Delete Application
          </button>
        </div>
      </div>
    </div>
  );
}
