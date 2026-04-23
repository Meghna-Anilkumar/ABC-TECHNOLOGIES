import { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { Plus, Edit2, Trash2, LogOut } from 'lucide-react';
import { serviceService } from '../../services/serviceService';
import type { IService } from '../../types';
import { useAuth } from '../../context/AuthContext';
import Modal from '../../components/common/Modal';
import Toast from '../../components/common/Toast';

const AdminDashboard = () => {
  const [services, setServices] = useState<IService[]>([]);
  const [loading, setLoading] = useState(true);
  const [showFormModal, setShowFormModal] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [serviceToDelete, setServiceToDelete] = useState<string | null>(null);
  const [editingService, setEditingService] = useState<IService | null>(null);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    icon: 'cube',
    isActive: true,
  });
  const [saving, setSaving] = useState(false);
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' } | null>(null);

  const navigate = useNavigate();
  const { logout: authLogout } = useAuth();

  const fetchServices = useCallback(async () => {
    setLoading(true);
    try {
      const data = await serviceService.getAllServices();
      setServices(data);
    } catch (error: any) {
      if (error.response?.status === 401 || error.response?.status === 403) {
        authLogout();
        navigate('/admin/login');
      }
    } finally {
      setLoading(false);
    }
  }, [navigate, authLogout]);

  useEffect(() => {
    fetchServices();
  }, [fetchServices]);

  const showToast = (message: string, type: 'success' | 'error') => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3000);
  };


  const openAddModal = () => {
    setEditingService(null);
    setFormData({ title: '', description: '', icon: 'cube', isActive: true });
    setShowFormModal(true);
  };

  const openEditModal = (service: IService) => {
    setEditingService(service);
    setFormData({
      title: service.title,
      description: service.description,
      icon: service.icon || 'cube',
      isActive: service.isActive,
    });
    setShowFormModal(true);
  };

  const closeFormModal = () => {
    setShowFormModal(false);
    setEditingService(null);
  };


  const openDeleteConfirm = (id: string) => {
    setServiceToDelete(id);
    setShowConfirmModal(true);
  };

  const closeConfirmModal = () => {
    setShowConfirmModal(false);
    setServiceToDelete(null);
  };

  const confirmDelete = async () => {
    if (!serviceToDelete) return;

    try {
      await serviceService.deleteService(serviceToDelete);
      showToast('Service deleted successfully', 'success');
      fetchServices();
    } catch {
      showToast('Failed to delete service', 'error');
    } finally {
      closeConfirmModal();
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title.trim() || !formData.description.trim()) {
      alert('Title and Description are required');
      return;
    }

    setSaving(true);
    try {
      if (editingService) {
        await serviceService.updateService(editingService._id, formData);
        showToast('Service updated successfully!', 'success');
      } else {
        await serviceService.createService(formData);
        showToast('Service added successfully!', 'success');
      }
      closeFormModal();
      fetchServices();
    } catch {
      showToast('Failed to save service', 'error');
    } finally {
      setSaving(false);
    }
  };

  const logout = () => {
    authLogout();
    navigate('/admin/login');
  };

  return (
    <div className="min-h-screen bg-[#050505] text-white">
      <header className="sticky top-0 z-40 bg-zinc-950 border-b border-white/10">
        <div className="max-w-7xl mx-auto px-8 py-6 flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-green-500">ABC Technologies</h1>
            <p className="text-gray-400">Service Management</p>
          </div>
          <div className="flex gap-4">
            <button
              onClick={openAddModal}
              className="flex items-center gap-2 bg-green-600 hover:bg-green-500 px-6 py-3 rounded-2xl font-medium transition-colors"
            >
              <Plus className="w-5 h-5" /> Add Service
            </button>
            <button
              onClick={logout}
              className="flex items-center gap-2 px-6 py-3 border border-white/20 hover:bg-white/10 rounded-2xl transition-colors"
            >
              <LogOut className="w-5 h-5" /> Logout
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-8 py-12">
        <h2 className="text-4xl font-bold mb-8">Manage Services</h2>

        {loading ? (
          <div className="text-center py-20 text-gray-500">Loading services...</div>
        ) : services.length === 0 ? (
          <div className="text-center py-20 text-gray-500">No services yet. Add one!</div>
        ) : (
          <div className="space-y-6">
            {services.map((service) => (
              <div key={service._id} className="bg-zinc-900 border border-white/10 rounded-3xl p-8">
                <div className="flex justify-between items-start">
                  <div className="flex-1 pr-4">
                    <div className="flex items-center gap-3">
                      <h3 className="text-2xl font-semibold">{service.title}</h3>
                      {!service.isActive && (
                        <span className="text-xs px-2 py-1 bg-zinc-700 text-gray-400 rounded-full">Inactive</span>
                      )}
                    </div>
                    <p className="text-gray-300 mt-3">{service.description}</p>
                  </div>
                  <div className="flex gap-3 shrink-0">
                    <button
                      onClick={() => openEditModal(service)}
                      className="p-3 hover:bg-white/10 rounded-xl transition-colors"
                    >
                      <Edit2 className="w-5 h-5" />
                    </button>
                    <button
                      onClick={() => openDeleteConfirm(service._id)}
                      className="p-3 hover:bg-red-500/10 text-red-400 rounded-xl transition-colors"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>

      {/* Form Modal (Add / Edit) */}
      <Modal
        isOpen={showFormModal}
        onClose={closeFormModal}
        title={editingService ? 'Edit Service' : 'Add New Service'}
      >
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-gray-400 mb-2">Title</label>
            <input
              type="text"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              className="w-full bg-black border border-zinc-700 focus:border-green-500 outline-none rounded-2xl px-6 py-4 text-white"
              required
            />
          </div>

          <div>
            <label className="block text-gray-400 mb-2">Description</label>
            <textarea
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              rows={5}
              className="w-full bg-black border border-zinc-700 focus:border-green-500 outline-none rounded-2xl px-6 py-4 text-white resize-y"
              required
            />
          </div>

          <div className="flex items-center gap-3">
            <input
              type="checkbox"
              id="isActive"
              checked={formData.isActive}
              onChange={(e) => setFormData({ ...formData, isActive: e.target.checked })}
              className="w-5 h-5 accent-green-500"
            />
            <label htmlFor="isActive" className="text-gray-300 cursor-pointer">Active on website</label>
          </div>

          <div className="flex gap-4 pt-6">
            <button
              type="button"
              onClick={closeFormModal}
              className="flex-1 py-4 border border-white/30 hover:bg-white/5 rounded-2xl transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={saving}
              className="flex-1 py-4 bg-green-600 hover:bg-green-500 disabled:bg-zinc-700 rounded-2xl font-semibold transition-colors"
            >
              {saving ? 'Saving...' : editingService ? 'Update' : 'Add Service'}
            </button>
          </div>
        </form>
      </Modal>

      {/* Confirmation Modal for Delete */}
      <Modal
        isOpen={showConfirmModal}
        onClose={closeConfirmModal}
        title="Delete Service"
        size="sm"
      >
        <p className="text-gray-300 text-lg mb-8">
          Are you sure you want to delete this service? This action cannot be undone.
        </p>

        <div className="flex gap-4">
          <button
            onClick={closeConfirmModal}
            className="flex-1 py-4 border border-white/30 hover:bg-white/5 rounded-2xl transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={confirmDelete}
            className="flex-1 py-4 bg-red-600 hover:bg-red-500 rounded-2xl font-semibold transition-colors"
          >
            Yes, Delete
          </button>
        </div>
      </Modal>

      {/* Toast Notification */}
      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast(null)}
        />
      )}
    </div>
  );
};

export default AdminDashboard;