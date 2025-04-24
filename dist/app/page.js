"use client";
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = HomePage;
const navigation_1 = require("next/navigation");
const ui_1 = require("@/components/ui");
function HomePage() {
    const router = (0, navigation_1.useRouter)();
    return (<div className="min-h-screen flex flex-col items-center justify-center bg-gray-50">
      <div className="max-w-md w-full space-y-8 p-8 bg-white rounded-xl shadow-lg">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-900">Welcome to Your App</h1>
          <p className="mt-2 text-gray-600">You are logged in successfully!</p>
        </div>
        
        <div className="mt-8 space-y-4">
          <ui_1.Button variant="primary" onClick={() => router.push('/profile')} className="w-full">
            View My Profile
          </ui_1.Button>
          
          <ui_1.Button variant="secondary" onClick={() => router.push('/logout')} className="w-full">
            Logout
          </ui_1.Button>
        </div>
      </div>
    </div>);
}
//# sourceMappingURL=page.js.map