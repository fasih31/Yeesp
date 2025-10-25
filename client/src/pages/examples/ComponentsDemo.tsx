import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { ConfirmationDialog } from '@/components/modals/ConfirmationDialog';
import { FileUploadDialog } from '@/components/modals/FileUploadDialog';
import { LoadingSpinner, InlineLoader } from '@/components/LoadingSpinner';
import { EmptyState } from '@/components/EmptyState';
import { api, handleApiError } from '@/lib/api';
import { AlertCircle, CheckCircle, Info, Upload, Trash2 } from 'lucide-react';

export default function ComponentsDemo() {
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [uploadOpen, setUploadOpen] = useState(false);

  // Example: Toast Notifications
  const showSuccessToast = () => {
    toast({
      title: 'Success!',
      description: 'Your action was completed successfully.',
    });
  };

  const showErrorToast = () => {
    toast({
      variant: 'destructive',
      title: 'Error',
      description: 'Something went wrong. Please try again.',
    });
  };

  const showInfoToast = () => {
    toast({
      title: 'Information',
      description: 'This is an informational message.',
    });
  };

  // Example: Confirmation Dialog
  const handleDelete = () => {
    toast({
      title: 'Deleted',
      description: 'Item was successfully deleted.',
    });
  };

  // Example: File Upload
  const handleUpload = async (files: File[]) => {
    console.log('Uploading files:', files);
    await new Promise(resolve => setTimeout(resolve, 2000));
    toast({
      title: 'Upload complete',
      description: `${files.length} file(s) uploaded successfully.`,
    });
  };

  // Example: API Call with Error Handling
  const handleApiCall = async () => {
    setLoading(true);
    try {
      // Example API call - replace with actual endpoint
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      toast({
        title: 'API call successful',
        description: 'Data fetched successfully.',
      });
    } catch (error) {
      const errorMessage = handleApiError(error);
      toast({
        variant: 'destructive',
        title: 'API Error',
        description: errorMessage,
      });
    } finally {
      setLoading(false);
    }
  };

  // Example: Form Submission with Validation
  const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData);

    if (!data.title || !data.description) {
      toast({
        variant: 'destructive',
        title: 'Validation Error',
        description: 'Please fill in all required fields.',
      });
      return;
    }

    setLoading(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      toast({
        title: 'Form submitted',
        description: 'Your data has been saved successfully.',
      });
      
      e.currentTarget.reset();
    } catch (error) {
      toast({
        variant: 'destructive',
        title: 'Submission failed',
        description: 'Failed to save your data. Please try again.',
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto p-6 space-y-6">
      <div>
        <h1 className="text-3xl font-bold mb-2">Component Examples</h1>
        <p className="text-muted-foreground">
          Demonstrations of all reusable components and patterns in the YEESP platform.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {/* Toast Notifications */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Info className="h-5 w-5" />
              Toast Notifications
            </CardTitle>
            <CardDescription>
              Show user feedback messages with different variants
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <Button onClick={showSuccessToast} variant="default" className="w-full">
              <CheckCircle className="h-4 w-4 mr-2" />
              Success Toast
            </Button>
            <Button onClick={showErrorToast} variant="destructive" className="w-full">
              <AlertCircle className="h-4 w-4 mr-2" />
              Error Toast
            </Button>
            <Button onClick={showInfoToast} variant="outline" className="w-full">
              <Info className="h-4 w-4 mr-2" />
              Info Toast
            </Button>
          </CardContent>
        </Card>

        {/* Confirmation Dialog */}
        <Card>
          <CardHeader>
            <CardTitle>Confirmation Dialog</CardTitle>
            <CardDescription>
              Ask user to confirm destructive actions
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button 
              onClick={() => setConfirmOpen(true)} 
              variant="destructive"
              className="w-full"
            >
              <Trash2 className="h-4 w-4 mr-2" />
              Delete Item
            </Button>
            <ConfirmationDialog
              open={confirmOpen}
              onOpenChange={setConfirmOpen}
              title="Are you sure?"
              description="This action cannot be undone. This will permanently delete the item."
              onConfirm={handleDelete}
              variant="destructive"
              confirmText="Delete"
              cancelText="Cancel"
            />
          </CardContent>
        </Card>

        {/* File Upload Dialog */}
        <Card>
          <CardHeader>
            <CardTitle>File Upload Dialog</CardTitle>
            <CardDescription>
              Upload files with validation and progress
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button 
              onClick={() => setUploadOpen(true)}
              className="w-full"
            >
              <Upload className="h-4 w-4 mr-2" />
              Upload Files
            </Button>
            <FileUploadDialog
              open={uploadOpen}
              onOpenChange={setUploadOpen}
              title="Upload Documents"
              description="Select files to upload (max 10MB each)"
              onUpload={handleUpload}
              accept=".pdf,.doc,.docx,.jpg,.png"
              multiple={true}
              maxSize={10}
            />
          </CardContent>
        </Card>

        {/* Loading States */}
        <Card>
          <CardHeader>
            <CardTitle>Loading States</CardTitle>
            <CardDescription>
              Show loading indicators during async operations
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm">Small Spinner:</span>
              <LoadingSpinner size="sm" />
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm">Medium Spinner:</span>
              <LoadingSpinner size="md" />
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm">Large Spinner:</span>
              <LoadingSpinner size="lg" />
            </div>
            <InlineLoader text="Loading data..." />
          </CardContent>
        </Card>

        {/* Empty State */}
        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle>Empty State</CardTitle>
            <CardDescription>
              Show when there's no data to display
            </CardDescription>
          </CardHeader>
          <CardContent>
            <EmptyState
              icon={AlertCircle}
              title="No items found"
              description="There are no items to display. Create your first item to get started."
              action={{
                label: 'Create Item',
                onClick: () => toast({ title: 'Action clicked!' }),
              }}
            />
          </CardContent>
        </Card>

        {/* API Call Example */}
        <Card>
          <CardHeader>
            <CardTitle>API Call with Error Handling</CardTitle>
            <CardDescription>
              Demonstrate API request with proper error handling
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button 
              onClick={handleApiCall} 
              disabled={loading}
              className="w-full"
            >
              {loading ? (
                <>
                  <LoadingSpinner size="sm" className="mr-2" />
                  Loading...
                </>
              ) : (
                'Make API Call'
              )}
            </Button>
          </CardContent>
        </Card>

        {/* Form Example */}
        <Card>
          <CardHeader>
            <CardTitle>Form with Validation</CardTitle>
            <CardDescription>
              Form submission with validation and error handling
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleFormSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="title">Title *</Label>
                <Input 
                  id="title" 
                  name="title" 
                  placeholder="Enter title" 
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="description">Description *</Label>
                <Textarea 
                  id="description" 
                  name="description" 
                  placeholder="Enter description" 
                  required
                />
              </div>
              <Button type="submit" disabled={loading} className="w-full">
                {loading ? (
                  <>
                    <LoadingSpinner size="sm" className="mr-2" />
                    Submitting...
                  </>
                ) : (
                  'Submit Form'
                )}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>

      {/* Code Examples */}
      <Card>
        <CardHeader>
          <CardTitle>Usage Examples</CardTitle>
          <CardDescription>
            Code snippets for implementing these patterns
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <h4 className="font-semibold mb-2">Toast Notification:</h4>
            <pre className="bg-muted p-3 rounded-md text-sm overflow-x-auto">
{`import { useToast } from '@/hooks/use-toast';

const { toast } = useToast();

toast({
  title: 'Success!',
  description: 'Your action was completed.',
});

toast({
  variant: 'destructive',
  title: 'Error',
  description: 'Something went wrong.',
});`}
            </pre>
          </div>

          <div>
            <h4 className="font-semibold mb-2">API Call with Error Handling:</h4>
            <pre className="bg-muted p-3 rounded-md text-sm overflow-x-auto">
{`import { api, handleApiError } from '@/lib/api';

try {
  const tickets = await api.supportTickets.getByUser(userId);
  // Handle success
} catch (error) {
  const errorMessage = handleApiError(error);
  toast({
    variant: 'destructive',
    title: 'Error',
    description: errorMessage,
  });
}`}
            </pre>
          </div>

          <div>
            <h4 className="font-semibold mb-2">Confirmation Dialog:</h4>
            <pre className="bg-muted p-3 rounded-md text-sm overflow-x-auto">
{`import { ConfirmationDialog } from '@/components/modals/ConfirmationDialog';

<ConfirmationDialog
  open={confirmOpen}
  onOpenChange={setConfirmOpen}
  title="Are you sure?"
  description="This action cannot be undone."
  onConfirm={handleDelete}
  variant="destructive"
/>`}
            </pre>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
