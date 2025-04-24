"use client";
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = ProfilePage;
const react_1 = require("react");
const navigation_1 = require("next/navigation");
const axios_1 = require("@/lib/axios");
const ui_1 = require("@/components/ui");
function ProfilePage() {
    const router = (0, navigation_1.useRouter)();
    const [userDetails, setUserDetails] = (0, react_1.useState)(null);
    const [loading, setLoading] = (0, react_1.useState)(true);
    const [error, setError] = (0, react_1.useState)('');
    (0, react_1.useEffect)(() => {
        fetchUserDetails();
    }, []);
    const fetchUserDetails = async () => {
        try {
            const response = await axios_1.default.get('/auth/me');
            setUserDetails(response.data.user);
        }
        catch (error) {
            setError('Failed to fetch user details');
            console.error('Error fetching user details:', error);
        }
        finally {
            setLoading(false);
        }
    };
    if (loading) {
        return (<div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>);
    }
    if (error) {
        return (<div className="min-h-screen flex items-center justify-center">
        <div className="text-red-500">{error}</div>
      </div>);
    }
    return (<div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <div className="bg-white shadow rounded-lg overflow-hidden">
          <div className="px-4 py-5 sm:px-6 bg-gray-50">
            <h3 className="text-lg leading-6 font-medium text-gray-900">
              Profile Information
            </h3>
            <p className="mt-1 max-w-2xl text-sm text-gray-500">
              Your personal account details
            </p>
          </div>
          <div className="border-t border-gray-200 px-4 py-5 sm:px-6">
            <dl className="grid grid-cols-1 gap-x-4 gap-y-8 sm:grid-cols-2">
              <div className="sm:col-span-1">
                <dt className="text-sm font-medium text-gray-500">Name</dt>
                <dd className="mt-1 text-sm text-gray-900">{userDetails === null || userDetails === void 0 ? void 0 : userDetails.name}</dd>
              </div>
              <div className="sm:col-span-1">
                <dt className="text-sm font-medium text-gray-500">Email</dt>
                <dd className="mt-1 text-sm text-gray-900">{userDetails === null || userDetails === void 0 ? void 0 : userDetails.userEmail}</dd>
              </div>
              <div className="sm:col-span-1">
                <dt className="text-sm font-medium text-gray-500">Role</dt>
                <dd className="mt-1 text-sm text-gray-900">{userDetails === null || userDetails === void 0 ? void 0 : userDetails.role}</dd>
              </div>
              <div className="sm:col-span-1">
                <dt className="text-sm font-medium text-gray-500">Account Created</dt>
                <dd className="mt-1 text-sm text-gray-900">
                  {new Date((userDetails === null || userDetails === void 0 ? void 0 : userDetails.createdAt) || '').toLocaleDateString()}
                </dd>
              </div>
              <div className="sm:col-span-1">
                <dt className="text-sm font-medium text-gray-500">Last Activity</dt>
                <dd className="mt-1 text-sm text-gray-900">
                  {new Date((userDetails === null || userDetails === void 0 ? void 0 : userDetails.lastActivity) || '').toLocaleString()}
                </dd>
              </div>
            </dl>
          </div>
          <div className="px-4 py-4 sm:px-6 bg-gray-50 flex justify-end">
            <ui_1.Button variant="primary" onClick={() => router.push('/')} className="mr-2">
              Back to Home
            </ui_1.Button>
            <ui_1.Button variant="secondary" onClick={() => router.push('/profile/edit')}>
              Edit Profile
            </ui_1.Button>
          </div>
        </div>
      </div>
    </div>);
}
//# sourceMappingURL=page.js.map