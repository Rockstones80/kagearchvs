import React from "react";

/**
 * AnimatedLink — slide-up hover effect, ported from Korty's AnimatedLink.vue
 * Wrap any text/children in this inside a `group` parent for hover to work.
 */
export default function AnimatedLink({
  children,
  bezier = false,
}: {
  children: React.ReactNode;
  bezier?: boolean;
}) {
  return (
    <span
      style={{
        display: "inline-flex",
        alignItems: "center",
        position: "relative",
        overflowY: "hidden",
      }}
    >
      <span
        style={{
          display: "inline-flex",
          flexDirection: "column",
          transition: bezier
            ? "transform 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)"
            : "transform 0.3s ease-out",
        }}
        className="group-hover:-translate-y-full"
      >
        {/* visible text */}
        <span style={{ whiteSpace: "nowrap" }}>{children}</span>
        {/* duplicate slides in from below */}
        <span
          style={{
            position: "absolute",
            top: "100%",
            left: 0,
            whiteSpace: "nowrap",
          }}
        >
          {children}
        </span>
      </span>
    </span>
  );
}
