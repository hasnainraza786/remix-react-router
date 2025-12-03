/**
 * Branches Pages Heading
 */
"use client";

import React, { useCallback, useMemo } from "react";

import PageHeading, { type PageHeadingProps } from "~/components/PageHeading";

import { routes } from "~/router/routes";

import { toBoolean } from "~/utils";

import { useQueryParams } from "~/hooks/useQueryParams";
import { useParams } from "react-router";
import messages from "./messages";
import { useListingFilters } from "~/pages/shared/hooks/useListingFilters";

interface HeadingProps extends Omit<PageHeadingProps, "heading"> {
  showAddButton?: boolean;
  showEditButton?: boolean;
  showIncludeInActive?: boolean;
  headingType: "list" | "detail" | "edit" | "create";
}

export default function Heading({
  showAddButton,
  showEditButton,
  showIncludeInActive,
  headingType = "list",
}: HeadingProps): React.JSX.Element {
  const { route } = useQueryParams();
  const { id } = useParams();

  const { filters, setFilter } = useListingFilters();

  const handleIncludeInActivePress = useCallback(
    (checked: boolean) => {
      setFilter({
        includeInActive: !!checked,
      });
    },
    [setFilter]
  );

  const pageHeading = useMemo(() => messages[headingType], [headingType]);

  return (
    <PageHeading
      heading={pageHeading}
      isIncludeInActive={toBoolean(filters?.includeInActive)}
      onAddPress={
        showAddButton ? () => route({ url: routes.user.create }) : undefined
      }
      onEditPress={
        showEditButton
          ? () => route({ url: routes.user.edit(id as string) })
          : undefined
      }
      onCheckedIncludeInActive={
        showIncludeInActive ? handleIncludeInActivePress : undefined
      }
    />
  );
}
