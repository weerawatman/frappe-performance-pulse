
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { useToast } from '@/hooks/use-toast';
import { authService } from '@/services/authService';
import { LogIn, Building } from 'lucide-react';

const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      const result = authService.login(email, password);
      
      if (result.success && result.user) {
        toast({
          title: "เข้าสู่ระบบสำเร็จ",
          description: `ยินดีต้อนรับ ${result.user.name}`,
        });
        
        // Navigate based on user role
        if (result.user.role === 'admin' || result.user.role === 'manager') {
          navigate('/');
        } else {
          navigate('/employee-dashboard');
        }
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
              <Building className="w-8 h-8 text-white" />
            </div>
          </div>
          <h1 className="text-3xl font-bold text-gray-900">Performance Management</h1>
          <p className="text-gray-600 mt-2">ระบบบริหารผลงานและประเมินพนักงาน</p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <LogIn className="w-5 h-5" />
              เข้าสู่ระบบ
            </CardTitle>
            <CardDescription>
              กรุณาเข้าสู่ระบบเพื่อใช้งานระบบ Performance Management
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
                  <p><strong>Admin:</strong> admin@company.com</p>
                  <p><strong>Manager:</strong> manager@company.com</p>
                  <p><strong>รหัสผ่าน:</strong> password123</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="text-center text-sm text-gray-600">
          <Link to="/" className="text-blue-600 hover:underline">
            กลับไปหน้าแรก
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
