import { useCallback, useState } from "react";
import { Upload, X, File, CheckCircle } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { useToast } from "@/hooks/use-toast";

interface FileUploaderProps {
  onUpload: (files: File[]) => Promise<void>;
  accept?: string;
  maxFiles?: number;
  maxSize?: number;
}

export function FileUploader({ onUpload, accept = "*", maxFiles = 5, maxSize = 10 * 1024 * 1024 }: FileUploaderProps) {
  const { toast } = useToast();
  const [files, setFiles] = useState<File[]>([]);
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState<{ [key: string]: number }>({});
  const [dragActive, setDragActive] = useState(false);

  const handleDrag = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    const droppedFiles = Array.from(e.dataTransfer.files);
    handleFiles(droppedFiles);
  }, []);

  const handleFiles = (newFiles: File[]) => {
    const validFiles = newFiles.filter(file => {
      if (file.size > maxSize) {
        toast({
          title: "File too large",
          description: `${file.name} exceeds ${maxSize / 1024 / 1024}MB limit`,
          variant: "destructive",
        });
        return false;
      }
      return true;
    });

    if (files.length + validFiles.length > maxFiles) {
      toast({
        title: "Too many files",
        description: `You can only upload ${maxFiles} files at a time`,
        variant: "destructive",
      });
      return;
    }

    setFiles(prev => [...prev, ...validFiles]);
  };

  const removeFile = (index: number) => {
    setFiles(prev => prev.filter((_, i) => i !== index));
  };

  const handleUpload = async () => {
    if (files.length === 0) return;

    setUploading(true);
    try {
      files.forEach((file, index) => {
        setUploadProgress(prev => ({ ...prev, [file.name]: 0 }));
        
        const interval = setInterval(() => {
          setUploadProgress(prev => {
            const current = prev[file.name] || 0;
            if (current >= 100) {
              clearInterval(interval);
              return prev;
            }
            return { ...prev, [file.name]: current + 10 };
          });
        }, 100);
      });

      await onUpload(files);
      
      toast({
        title: "Upload successful",
        description: `${files.length} file(s) uploaded successfully`,
      });
      setFiles([]);
      setUploadProgress({});
    } catch (error) {
      toast({
        title: "Upload failed",
        description: "Failed to upload files. Please try again.",
        variant: "destructive",
      });
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="space-y-4">
      <Card
        className={`border-2 border-dashed transition-colors ${
          dragActive ? "border-primary bg-primary/5" : "border-muted"
        }`}
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
      >
        <CardContent className="p-8">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <Upload className={`h-12 w-12 ${dragActive ? "text-primary" : "text-muted-foreground"}`} />
            <div>
              <p className="text-lg font-medium">
                {dragActive ? "Drop files here" : "Drag & drop files here"}
              </p>
              <p className="text-sm text-muted-foreground">
                or click to browse (max {maxFiles} files, {maxSize / 1024 / 1024}MB each)
              </p>
            </div>
            <input
              type="file"
              accept={accept}
              multiple
              onChange={(e) => handleFiles(Array.from(e.target.files || []))}
              className="hidden"
              id="file-upload"
            />
            <Button asChild variant="outline">
              <label htmlFor="file-upload" className="cursor-pointer">
                Browse Files
              </label>
            </Button>
          </div>
        </CardContent>
      </Card>

      {files.length > 0 && (
        <div className="space-y-2">
          <h3 className="font-medium">Selected Files ({files.length})</h3>
          {files.map((file, index) => (
            <Card key={index}>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3 flex-1">
                    <File className="h-8 w-8 text-primary" />
                    <div className="flex-1 min-w-0">
                      <p className="font-medium truncate">{file.name}</p>
                      <p className="text-sm text-muted-foreground">
                        {(file.size / 1024).toFixed(2)} KB
                      </p>
                      {uploadProgress[file.name] !== undefined && (
                        <div className="mt-2">
                          <Progress value={uploadProgress[file.name]} className="h-1" />
                          <p className="text-xs text-muted-foreground mt-1">
                            {uploadProgress[file.name]}%
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
                  {uploadProgress[file.name] === 100 ? (
                    <CheckCircle className="h-5 w-5 text-green-500" />
                  ) : (
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => removeFile(index)}
                      disabled={uploading}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
          <Button 
            onClick={handleUpload} 
            disabled={uploading || files.length === 0}
            className="w-full"
          >
            {uploading ? "Uploading..." : `Upload ${files.length} File(s)`}
          </Button>
        </div>
      )}
    </div>
  );
}
