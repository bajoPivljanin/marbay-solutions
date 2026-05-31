"use client";

import { useEffect, useState } from "react";
import { Check, X } from "lucide-react";

type Currency = "EUR" | "RSD" | "HUF";

const numberFormat = new Intl.NumberFormat("en-US");

type FormStatus = "idle" | "loading" | "success" | "error";

const rates = {
  EUR: { rate: 1, format: (val: number) => `${numberFormat.format(val)} €` },
  RSD: { rate: 118, format: (val: number) => `${numberFormat.format(val)} RSD` },
  HUF: { rate: 400, format: (val: number) => `${numberFormat.format(val)} Ft` },
};

const floatingLabelClass =
  "absolute left-0 top-6 font-label-caps text-label-caps text-on-surface-variant transition-all peer-focus:top-0 peer-focus:text-[10px] peer-focus:text-primary peer-[:not(:placeholder-shown)]:top-0 peer-[:not(:placeholder-shown)]:text-[10px] uppercase pointer-events-none";

const inputClass =
  "w-full bg-transparent border-0 border-b border-outline/40 py-2 focus:ring-0 focus:border-primary transition-colors peer text-on-surface focus:outline-none";

export default function PricingComparison({ dict }: { dict: any }) {
  const [currency, setCurrency] = useState<Currency>("EUR");
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState("");
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [formStatus, setFormStatus] = useState<FormStatus>("idle");

  const formLabels = dict.pricing.form;
  const isSubmitting = formStatus === "loading";
  const isSuccess = formStatus === "success";

  const formatPrice = (val: number | string) => {
    if (typeof val === "string") return val;
    return rates[currency].format(Math.round(val * rates[currency].rate));
  };

  const openPlanForm = (planName: string) => {
    setSelectedPlan(planName);
    setFullName("");
    setEmail("");
    setMessage("");
    setFormStatus("idle");
    setIsFormOpen(true);
  };

  const closePlanForm = () => {
    if (isSubmitting) return;
    setIsFormOpen(false);
    setFormStatus("idle");
  };

  useEffect(() => {
    if (!isFormOpen) return;

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") closePlanForm();
    };

    document.body.style.overflow = "hidden";
    document.addEventListener("keydown", onKeyDown);

    return () => {
      document.body.style.overflow = "";
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [isFormOpen]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isSubmitting || isSuccess) return;

    setFormStatus("loading");

    try {
      const response = await fetch("/api/plan-inquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          fullName,
          email,
          plan: selectedPlan,
          message,
        }),
      });

      if (!response.ok) {
        setFormStatus("error");
        return;
      }

      setFormStatus("success");
    } catch {
      setFormStatus("error");
    }
  };

  const plans = [
    {
      name: dict.pricing.basic,
      price: 900,
      description: dict.pricing.basicDesc,
      features: [
        { label: dict.pricing.features.website, value: dict.pricing.featureValues.basicWebsite },
        { label: dict.pricing.features.forms, value: dict.pricing.featureValues.basicForms },
        { label: dict.pricing.features.dev, value: dict.pricing.featureValues.basicDev },
        { label: dict.pricing.features.seo, value: dict.pricing.featureValues.basicSeo },
        { label: dict.pricing.features.ads, value: dict.pricing.featureValues.basicAds },
        { label: dict.pricing.features.analytics, value: dict.pricing.featureValues.basicAnalytics },
        { label: dict.pricing.features.support, value: dict.pricing.featureValues.basicSupport },
        { label: dict.pricing.features.videos, value: dict.pricing.featureValues.basicVideos }
      ],
      highlight: false,
      buttonText: dict.pricing.startBasic
    },
    {
      name: dict.pricing.custom,
      price: dict.pricing.customPrice,
      description: dict.pricing.customDesc,
      features: [
        { label: dict.pricing.features.website, value: dict.pricing.featureValues.customWebsite },
        { label: dict.pricing.features.forms, value: dict.pricing.featureValues.customForms },
        { label: dict.pricing.features.dev, value: dict.pricing.featureValues.customDev },
        { label: dict.pricing.features.seo, value: dict.pricing.featureValues.customSeo },
        { label: dict.pricing.features.ads, value: dict.pricing.featureValues.customAds },
        { label: dict.pricing.features.analytics, value: dict.pricing.featureValues.customAnalytics },
        { label: dict.pricing.features.support, value: dict.pricing.featureValues.customSupport },
        { label: dict.pricing.features.videos, value: dict.pricing.featureValues.customVideos }
      ],
      highlight: true,
      buttonText: dict.pricing.getCustom
    },
    {
      name: dict.pricing.standard,
      price: 1500,
      description: dict.pricing.standardDesc,
      features: [
        { label: dict.pricing.features.website, value: dict.pricing.featureValues.standardWebsite },
        { label: dict.pricing.features.forms, value: dict.pricing.featureValues.standardForms },
        { label: dict.pricing.features.dev, value: dict.pricing.featureValues.standardDev },
        { label: dict.pricing.features.seo, value: dict.pricing.featureValues.standardSeo },
        { label: dict.pricing.features.ads, value: dict.pricing.featureValues.standardAds },
        { label: dict.pricing.features.analytics, value: dict.pricing.featureValues.standardAnalytics },
        { label: dict.pricing.features.support, value: dict.pricing.featureValues.standardSupport },
        { label: dict.pricing.features.videos, value: dict.pricing.featureValues.standardVideos }
      ],
      highlight: false,
      buttonText: dict.pricing.chooseStandard
    }
  ];

  return (
    <section id="pricing" className="w-full py-section-gap font-body-md">
      <div className="max-w-container-max mx-auto px-margin-mobile lg:px-margin-desktop w-full min-w-0">
      
      {/* Headings */}
      <div className="text-center mb-16">
        <h2 className="font-headline-md text-headline-md text-on-surface mb-4">{dict.pricing.title}</h2>
        <p className="font-body-lg text-body-lg text-on-surface-variant max-w-2xl mx-auto mb-8">
          {dict.pricing.subtitle}
        </p>

        {/* Currency Toggle */}
        <div className="flex justify-center">
          <div className="flex bg-surface-container-low rounded-full p-1 items-center max-w-full">
            {(["EUR", "RSD", "HUF"] as Currency[]).map((c) => (
              <button
                key={c}
                type="button"
                onClick={() => setCurrency(c)}
                className={`px-4 sm:px-6 py-2.5 rounded-full font-label-caps text-xs uppercase transition-all duration-300 ${
                  currency === c
                    ? "bg-primary text-on-primary shadow-md lg:scale-105"
                    : "text-primary font-bold hover:bg-surface-variant"
                }`}
              >
                {c}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Pricing Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {plans.map((plan) => (
          <div 
            key={plan.name}
            className={`flex flex-col p-8 rounded-3xl relative transition-transform duration-500 hover:translate-y-[-8px] ${
              plan.highlight 
                ? "bg-surface border-2 border-primary shadow-xl z-10 lg:-mt-6 lg:mb-6" 
                : "bg-surface-container-lowest border border-outline/10 shadow-sm"
            }`}
          >
            {plan.highlight && (
              <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-primary text-on-primary font-label-caps text-[10px] px-4 py-1.5 rounded-full uppercase tracking-widest shadow-md">
                {dict.pricing.mostPopular}
              </div>
            )}
            
            <h3 className="font-headline-sm text-2xl text-on-surface mb-2">{plan.name}</h3>
            <p className="text-on-surface-variant text-sm mb-6 leading-relaxed">{plan.description}</p>
            
            <div className="mb-8 flex items-baseline min-h-[2.75rem]">
              <span
                className={`font-headline-md text-on-surface leading-tight ${
                  typeof plan.price === "string" ? "text-2xl sm:text-3xl" : "text-4xl"
                }`}
              >
                {formatPrice(plan.price)}
              </span>
            </div>

            <button
              type="button"
              onClick={() => openPlanForm(plan.name)}
              className={`w-full py-4 rounded-lg font-label-caps uppercase text-xs tracking-wider transition-colors duration-300 mb-8 ${
                plan.highlight 
                ? "bg-primary text-on-primary hover:bg-surface-tint shadow-md hover:shadow-lg" 
                : "bg-transparent border border-outline text-on-surface hover:bg-surface-variant"
              }`}
            >
              {plan.buttonText}
            </button>

            <div className="flex flex-col gap-4 flex-grow">
              <span className="text-sm font-bold text-on-surface mb-2">{dict.pricing.whatsIncluded}</span>
              {plan.features.map((feature) => (
                <div key={feature.label} className="flex items-start gap-3">
                  <Check className={`w-5 h-5 flex-shrink-0 mt-0.5 ${plan.highlight ? "text-primary" : "text-tertiary"}`} strokeWidth={2.5} />
                  <span className="text-on-surface text-sm">
                    <strong>{feature.label}:</strong> {feature.value}
                  </span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
      </div>

      {isFormOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6"
          role="presentation"
          onClick={closePlanForm}
        >
          <div className="absolute inset-0 bg-on-surface/60 backdrop-blur-sm" aria-hidden />

          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="plan-inquiry-title"
            className="relative w-full max-w-lg bg-surface border border-outline-variant/30 p-8 lg:p-10 shadow-2xl max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-start justify-between gap-4 mb-8">
              <h3
                id="plan-inquiry-title"
                className="font-headline-sm text-headline-sm text-on-surface"
              >
                {formLabels.title}
              </h3>
              <button
                type="button"
                onClick={closePlanForm}
                className="text-on-surface-variant hover:text-on-surface transition-colors p-1 -m-1"
                aria-label={formLabels.close}
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {isSuccess ? (
              <p className="font-body-md text-on-surface-variant leading-relaxed">
                {formLabels.success}
              </p>
            ) : (
            <form className="flex flex-col gap-8" onSubmit={handleSubmit}>
              {formStatus === "error" && (
                <p className="text-sm text-error bg-error-container/20 border border-error/30 px-4 py-3 rounded">
                  {formLabels.error}
                </p>
              )}

              <div className="relative pt-4">
                <input
                  className={inputClass}
                  id="plan-fullName"
                  placeholder=" "
                  required
                  type="text"
                  disabled={isSubmitting}
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                />
                <label className={floatingLabelClass} htmlFor="plan-fullName">
                  {formLabels.fullName}
                </label>
              </div>

              <div className="relative pt-4">
                <input
                  className={inputClass}
                  id="plan-email"
                  placeholder=" "
                  required
                  type="email"
                  disabled={isSubmitting}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <label className={floatingLabelClass} htmlFor="plan-email">
                  {formLabels.email}
                </label>
              </div>

              <div className="relative pt-4">
                <input
                  className={`${inputClass} text-on-surface-variant cursor-default`}
                  id="plan-selected"
                  type="text"
                  readOnly
                  value={selectedPlan}
                  tabIndex={-1}
                />
                <label
                  className="absolute left-0 top-0 font-label-caps text-[10px] text-primary uppercase pointer-events-none"
                  htmlFor="plan-selected"
                >
                  {formLabels.plan}
                </label>
              </div>

              <div className="relative pt-4">
                <textarea
                  className={`${inputClass} resize-none`}
                  id="plan-message"
                  placeholder=" "
                  required
                  rows={4}
                  disabled={isSubmitting}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                />
                <label className={floatingLabelClass} htmlFor="plan-message">
                  {formLabels.message}
                </label>
              </div>

              <button
                className="bg-primary text-on-primary font-label-caps text-label-caps uppercase px-8 py-4 rounded hover:bg-surface-tint transition-colors duration-300 w-full disabled:opacity-60 disabled:cursor-not-allowed"
                type="submit"
                disabled={isSubmitting}
              >
                {isSubmitting ? formLabels.sending : formLabels.submit}
              </button>
            </form>
            )}

            {isSuccess && (
              <button
                type="button"
                onClick={closePlanForm}
                className="mt-8 bg-primary text-on-primary font-label-caps text-label-caps uppercase px-8 py-4 rounded hover:bg-surface-tint transition-colors duration-300 w-full"
              >
                {formLabels.close}
              </button>
            )}
          </div>
        </div>
      )}
    </section>
  );
}
