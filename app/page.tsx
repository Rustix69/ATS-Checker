"use client"

import type React from "react"

import { useState } from "react"
import { Upload, FileText, CheckCircle, AlertCircle, Download, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { LoginModal } from "@/components/auth/login-modal"
import { SignupModal } from "@/components/auth/signup-modal"
import { useToast } from "@/hooks/use-toast"

export default function Home() {
  const [resumeFile, setResumeFile] = useState<File | null>(null)
  const [jobDescFile, setJobDescFile] = useState<File | null>(null)
  const [jobDescText, setJobDescText] = useState("")
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [showResults, setShowResults] = useState(false)
  const [loginOpen, setLoginOpen] = useState(false)
  const [signupOpen, setSignupOpen] = useState(false)
  const { toast } = useToast()

  // Mock ATS analysis results
  const mockResults = {
    score: 78,
    matchedKeywords: ["JavaScript", "React", "TypeScript", "UI/UX", "Frontend"],
    missingKeywords: ["Next.js", "AWS", "Docker", "CI/CD"],
    isATSFriendly: true,
    suggestions: [
      "Add Next.js to your skills section",
      "Include experience with AWS or cloud platforms",
      "Mention Docker and containerization knowledge",
      "Add CI/CD pipeline experience",
      "Quantify your achievements with metrics",
    ],
  }

  const handleResumeUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setResumeFile(e.target.files[0])
    }
  }

  const handleJobDescFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setJobDescFile(e.target.files[0])
    }
  }

  const handleCheckScore = () => {
    if (!resumeFile) {
      toast({
        title: "Resume required",
        description: "Please upload your resume to continue",
        variant: "destructive",
      })
      return
    }

    if (!jobDescFile && !jobDescText) {
      toast({
        title: "Job description required",
        description: "Please upload or paste a job description to continue",
        variant: "destructive",
      })
      return
    }

    setIsAnalyzing(true)

    // Simulate API call with timeout
    setTimeout(() => {
      setIsAnalyzing(false)
      setShowResults(true)

      // Prompt user to save results after showing them
      setTimeout(() => {
        toast({
          title: "Save your results",
          description: "Sign up or log in to save this report to your history",
          action: (
            <Button size="sm" onClick={() => setSignupOpen(true)}>
              Sign Up
            </Button>
          ),
        })
      }, 2000)
    }, 3000)
  }

  const handleDownloadReport = () => {
    toast({
      title: "Report downloaded",
      description: "Your ATS analysis report has been downloaded",
    })
  }

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header/Navigation */}
      <header className="border-b sticky top-0 z-50 bg-background/95 backdrop-blur">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <FileText className="h-6 w-6 text-primary" />
              <span className="text-xl font-bold">ATS Score Checker</span>
            </div>

            {/* Navigation links removed as requested */}

            <div className="flex items-center space-x-3">
              <Button variant="ghost" onClick={() => setLoginOpen(true)} className="hidden md:inline-flex">
                Sign In
              </Button>
              <Button onClick={() => setSignupOpen(true)}>Sign Up</Button>
              <Button variant="outline" size="icon" className="md:hidden">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-5 w-5"
                >
                  <line x1="4" x2="20" y1="12" y2="12" />
                  <line x1="4" x2="20" y1="6" y2="6" />
                  <line x1="4" x2="20" y1="18" y2="18" />
                </svg>
              </Button>
            </div>
          </div>
        </div>
      </header>

      <main className="flex-1">
        {/* Hero Section */}
        <section className="py-12 md:py-20 bg-gradient-to-b from-muted/50 to-background">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-3xl md:text-5xl font-bold tracking-tight mb-4">Check Your ATS Score Instantly</h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-8">
              Upload your resume and job description to see how well you match the job — and get actionable feedback.
            </p>
          </div>
        </section>

        {/* Upload Section */}
        <section className="py-12">
          <div className="container mx-auto px-4 max-w-4xl">
            <div className="bg-card rounded-xl shadow-sm border p-6 md:p-8">
              <Tabs defaultValue="upload" className="w-full">
                <TabsList className="grid w-full grid-cols-2 mb-6">
                  <TabsTrigger value="upload">Upload Files</TabsTrigger>
                  <TabsTrigger value="paste">Paste Job Description</TabsTrigger>
                </TabsList>

                <div className="space-y-6">
                  {/* Resume Upload (Common to both tabs) */}
                  <div>
                    <label className="block text-sm font-medium mb-2">Upload Resume</label>
                    <div
                      className={`border-2 border-dashed rounded-lg p-6 text-center ${resumeFile ? "border-primary/50 bg-primary/5" : "border-muted-foreground/20"}`}
                    >
                      {resumeFile ? (
                        <div className="flex items-center justify-center space-x-2">
                          <FileText className="h-5 w-5 text-primary" />
                          <span className="font-medium">{resumeFile.name}</span>
                          <Button variant="ghost" size="sm" onClick={() => setResumeFile(null)} className="text-xs">
                            Change
                          </Button>
                        </div>
                      ) : (
                        <div>
                          <Upload className="h-8 w-8 mx-auto mb-2 text-muted-foreground" />
                          <p className="text-sm text-muted-foreground mb-2">
                            Drag and drop your resume here or click to browse
                          </p>
                          <Button variant="outline" size="sm" asChild>
                            <label>
                              Browse Files
                              <input
                                type="file"
                                className="hidden"
                                accept=".pdf,.doc,.docx"
                                onChange={handleResumeUpload}
                              />
                            </label>
                          </Button>
                          <p className="text-xs text-muted-foreground mt-2">Supported formats: PDF, DOCX</p>
                        </div>
                      )}
                    </div>
                  </div>

                  <TabsContent value="upload" className="mt-0">
                    <div>
                      <label className="block text-sm font-medium mb-2">Upload Job Description</label>
                      <div
                        className={`border-2 border-dashed rounded-lg p-6 text-center ${jobDescFile ? "border-primary/50 bg-primary/5" : "border-muted-foreground/20"}`}
                      >
                        {jobDescFile ? (
                          <div className="flex items-center justify-center space-x-2">
                            <FileText className="h-5 w-5 text-primary" />
                            <span className="font-medium">{jobDescFile.name}</span>
                            <Button variant="ghost" size="sm" onClick={() => setJobDescFile(null)} className="text-xs">
                              Change
                            </Button>
                          </div>
                        ) : (
                          <div>
                            <Upload className="h-8 w-8 mx-auto mb-2 text-muted-foreground" />
                            <p className="text-sm text-muted-foreground mb-2">
                              Drag and drop job description here or click to browse
                            </p>
                            <Button variant="outline" size="sm" asChild>
                              <label>
                                Browse Files
                                <input
                                  type="file"
                                  className="hidden"
                                  accept=".pdf,.doc,.docx,.txt"
                                  onChange={handleJobDescFileUpload}
                                />
                              </label>
                            </Button>
                            <p className="text-xs text-muted-foreground mt-2">Supported formats: PDF, DOCX, TXT</p>
                          </div>
                        )}
                      </div>
                    </div>
                  </TabsContent>

                  <TabsContent value="paste" className="mt-0">
                    <div>
                      <label className="block text-sm font-medium mb-2">Paste Job Description</label>
                      <textarea
                        className="w-full h-40 rounded-lg border p-3 text-sm resize-none focus:ring-2 focus:ring-primary/50 focus:border-primary"
                        placeholder="Paste the job description here..."
                        value={jobDescText}
                        onChange={(e) => setJobDescText(e.target.value)}
                      ></textarea>
                    </div>
                  </TabsContent>

                  <div className="pt-4">
                    <Button
                      className="w-full"
                      size="lg"
                      onClick={handleCheckScore}
                      disabled={isAnalyzing || !resumeFile || (!jobDescFile && !jobDescText)}
                    >
                      {isAnalyzing ? (
                        <>
                          Analyzing Resume <span className="ml-2 animate-pulse">...</span>
                        </>
                      ) : (
                        <>Check ATS Score</>
                      )}
                    </Button>
                  </div>
                </div>
              </Tabs>
            </div>
          </div>
        </section>

        {/* Results Section (Conditional) */}
        {showResults && (
          <section className="py-12 bg-muted/30">
            <div className="container mx-auto px-4 max-w-4xl">
              <div className="bg-card rounded-xl shadow-sm border p-6 md:p-8">
                <h2 className="text-2xl font-bold mb-6">ATS Analysis Results</h2>

                {/* Score */}
                <div className="mb-8">
                  <div className="flex justify-between items-center mb-2">
                    <h3 className="font-medium">ATS Score</h3>
                    <span className="text-lg font-bold">{mockResults.score}%</span>
                  </div>
                  <Progress value={mockResults.score} className="h-3" />
                  <p className="text-sm text-muted-foreground mt-2">
                    {mockResults.score >= 80
                      ? "Excellent match! Your resume is well-aligned with this job."
                      : mockResults.score >= 60
                        ? "Good match. With a few improvements, you can increase your chances."
                        : "Your resume needs significant improvements to match this job."}
                  </p>
                </div>

                {/* Keywords */}
                <div className="grid md:grid-cols-2 gap-6 mb-8">
                  <div className="space-y-3">
                    <h3 className="font-medium flex items-center">
                      <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                      Matched Keywords
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {mockResults.matchedKeywords.map((keyword, i) => (
                        <span key={i} className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full">
                          {keyword}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-3">
                    <h3 className="font-medium flex items-center">
                      <AlertCircle className="h-4 w-4 text-amber-500 mr-2" />
                      Missing Keywords
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {mockResults.missingKeywords.map((keyword, i) => (
                        <span key={i} className="px-2 py-1 bg-amber-100 text-amber-800 text-xs rounded-full">
                          {keyword}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* ATS Friendly Check */}
                <div className="mb-8 p-4 rounded-lg bg-muted">
                  <div className="flex items-start">
                    {mockResults.isATSFriendly ? (
                      <CheckCircle className="h-5 w-5 text-green-500 mr-3 mt-0.5" />
                    ) : (
                      <AlertCircle className="h-5 w-5 text-red-500 mr-3 mt-0.5" />
                    )}
                    <div>
                      <h3 className="font-medium">
                        {mockResults.isATSFriendly ? "ATS-Friendly Format" : "ATS Format Issues Detected"}
                      </h3>
                      <p className="text-sm text-muted-foreground">
                        {mockResults.isATSFriendly
                          ? "Your resume uses a format that ATS systems can easily read."
                          : "Your resume format may cause issues with ATS systems."}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Suggestions */}
                <div className="mb-8">
                  <h3 className="font-medium mb-3">Improvement Suggestions</h3>
                  <ul className="space-y-2">
                    {mockResults.suggestions.map((suggestion, i) => (
                      <li key={i} className="flex items-start">
                        <ArrowRight className="h-4 w-4 text-primary mr-2 mt-1 shrink-0" />
                        <span className="text-sm">{suggestion}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Actions */}
                <div className="flex flex-col sm:flex-row gap-4">
                  <Button onClick={handleDownloadReport} className="flex-1">
                    <Download className="mr-2 h-4 w-4" />
                    Download PDF Report
                  </Button>
                  <Button variant="outline" onClick={() => setSignupOpen(true)} className="flex-1">
                    Save to My Account
                  </Button>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* CTA Section */}
        <section className="py-16 bg-primary text-primary-foreground">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-2xl md:text-3xl font-bold mb-4">Want help improving your resume?</h2>
            <p className="text-lg opacity-90 max-w-2xl mx-auto mb-8">
              Our resume experts can help you optimize your resume for ATS systems and increase your chances of landing
              interviews.
            </p>
            <Button variant="secondary" size="lg">
              Contact Us
            </Button>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-muted/30 border-t py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div>
              <h3 className="font-bold mb-4">ATS Score Checker</h3>
              <p className="text-sm text-muted-foreground">
                Helping job seekers optimize their resumes for ATS systems.
              </p>
            </div>
            <div>
              <h3 className="font-bold mb-4">Links</h3>
              <ul className="space-y-2 text-sm">
                <li>
                  <a href="#" className="text-muted-foreground hover:text-foreground">
                    About
                  </a>
                </li>
                <li>
                  <a href="#" className="text-muted-foreground hover:text-foreground">
                    Features
                  </a>
                </li>
                <li>
                  <a href="#" className="text-muted-foreground hover:text-foreground">
                    Pricing
                  </a>
                </li>
                <li>
                  <a href="#" className="text-muted-foreground hover:text-foreground">
                    Contact
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold mb-4">Legal</h3>
              <ul className="space-y-2 text-sm">
                <li>
                  <a href="#" className="text-muted-foreground hover:text-foreground">
                    Privacy Policy
                  </a>
                </li>
                <li>
                  <a href="#" className="text-muted-foreground hover:text-foreground">
                    Terms of Service
                  </a>
                </li>
                <li>
                  <a href="#" className="text-muted-foreground hover:text-foreground">
                    Cookie Policy
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold mb-4">Connect</h3>
              <div className="flex space-x-4">
                <a href="#" className="text-muted-foreground hover:text-foreground">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="h-5 w-5"
                  >
                    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
                    <rect width="4" height="12" x="2" y="9"></rect>
                    <circle cx="4" cy="4" r="2"></circle>
                  </svg>
                </a>
                <a href="#" className="text-muted-foreground hover:text-foreground">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="h-5 w-5"
                  >
                    <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path>
                  </svg>
                </a>
                <a href="#" className="text-muted-foreground hover:text-foreground">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="h-5 w-5"
                  >
                    <rect width="20" height="20" x="2" y="2" rx="5" ry="5"></rect>
                    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"></line>
                  </svg>
                </a>
              </div>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t text-center text-sm text-muted-foreground">
            <p>© {new Date().getFullYear()} ATS Score Checker. All rights reserved.</p>
          </div>
        </div>
      </footer>

      {/* Auth Modals */}
      <LoginModal
        open={loginOpen}
        onOpenChange={setLoginOpen}
        onSignupClick={() => {
          setLoginOpen(false)
          setSignupOpen(true)
        }}
      />

      <SignupModal
        open={signupOpen}
        onOpenChange={setSignupOpen}
        onLoginClick={() => {
          setSignupOpen(false)
          setLoginOpen(true)
        }}
      />
    </div>
  )
}

