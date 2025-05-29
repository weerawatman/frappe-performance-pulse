
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { useAuth } from '@/contexts/AuthContext';
import { LogIn } from 'lucide-react';

const LoginPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      const result = await login(email, password);
      
      if (result.success && result.user) {
        // Navigate to the app launcher page for all users
        navigate('/');
      } else {
        setError(result.error || 'เกิดข้อผิดพลาดในการเข้าสู่ระบบ');
      }
    } catch (err) {
      setError('เกิดข้อผิดพลาดในการเข้าสู่ระบบ');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="w-full max-w-md space-y-6">
        <div className="text-center">
          <div className="flex justify-center mb-4">
            <div className="bg-blue-600 p-3 rounded-full">
              <img 
                src="/lovable-uploads/3ee75ef7-d7d2-4357-8492-aeded3669568.png" 
                alt="Somboon Logo" 
                className="w-8 h-8" 
              />
            </div>
          </div>
          <h1 className="text-3xl font-bold text-gray-900">Somboon Employee Connect</h1>
          <p className="text-gray-600 mt-2">ระบบบริหารผลงานและประเมินพนักงาน</p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <LogIn className="w-5 h-5" />
              เข้าสู่ระบบ
            </CardTitle>
            <CardDescription>
              กรุณาเข้าสู่ระบบเพื่อใช้งานระบบ Somboon Employee Connect
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleLogin} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">อีเมล</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="กรุณาใส่อีเมลของคุณ"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="password">รหัสผ่าน</Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="กรุณาใส่รหัสผ่าน"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>

              {error && (
                <Alert variant="destructive">
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}

              <Button 
                type="submit" 
                className="w-full" 
                disabled={isLoading}
              >
                {isLoading ? 'กำลังเข้าสู่ระบบ...' : 'เข้าสู่ระบบ'}
              </Button>
            </form>

            <div className="mt-6 pt-4 border-t">
              <div className="text-sm text-gray-600">
                <p className="font-medium mb-2">บัญชีทดสอบ:</p>
                <div className="bg-gray-50 p-3 rounded space-y-1">
                  <p><strong>ผู้ดูแลระบบ:</strong> admin@company.com</p>
                  <p><strong>พนักงาน:</strong> somchai@company.com</p>
                  <p><strong>Checker:</strong> somsak@company.com</p>
                  <p><strong>Approver:</strong> somboon@company.com</p>
                  <p><strong>รหัสผ่าน:</strong> password</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default LoginPage;
