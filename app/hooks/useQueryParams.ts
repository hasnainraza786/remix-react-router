import { useCallback } from "react";
import { useLocation, useNavigate, useSearchParams } from "react-router";
import qs from "query-string";

export function useQueryParams() {
  const location = useLocation();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const pathname = location.pathname;
  const params = new URLSearchParams(searchParams.toString());

  const route = useCallback(
    ({
      url,
      param,
      replace,
      scroll = true,
    }: {
      url?: string;
      param?: string | null;
      replace?: boolean;
      scroll?: boolean;
    }) => {
      const path = url || pathname;
      const fullPath = param ? `${path}?${param}` : path;
      navigate(fullPath, { replace });
      if (scroll) window.scrollTo({ top: 0 });
    },
    [pathname, navigate]
  );

  const setParam = useCallback(
    ({
      newParams,
      allParams,
      replace,
      scroll = true,
    }: {
      newParams?: Record<string, string | boolean>;
      allParams?: string;
      replace?: boolean;
      scroll?: boolean;
    }) => {
      let stringQuery;
      if (!allParams) {
        const oldParams = qs.parse(searchParams.toString());
        stringQuery = qs.stringify(
          { ...oldParams, ...newParams },
          { arrayFormat: "bracket" }
        );
      } else {
        stringQuery = allParams;
      }
      route({ param: stringQuery, replace, scroll });
    },
    [searchParams, route]
  );

  const setNewParams = useCallback(
    (newParams: Record<string, string | number | boolean | undefined>) => {
      const stringQuery = qs.stringify(newParams);
      route({ param: stringQuery });
    },
    [route]
  );

  const getAllParams = useCallback(() => {
    const allParams = qs.parse(searchParams.toString(), {
      arrayFormat: "bracket",
    });
    return allParams || {};
  }, [searchParams]);

  const deleteParams = useCallback(
    (keys: string[]) => {
      if (keys && keys.length) {
        const oldParams = qs.parse(searchParams.toString());
        keys.forEach((key) => {
          delete oldParams[key];
        });
        const stringQuery = qs.stringify({ ...oldParams });
        route({ param: stringQuery });
      }
    },
    [searchParams, route]
  );

  const getParam = useCallback(
    ({ name }: { name: string }) => {
      return params.get(name);
    },
    [params]
  );

  return {
    setParam,
    setNewParams,
    getParam,
    getAllParams,
    route,
    deleteParams,
  };
}
