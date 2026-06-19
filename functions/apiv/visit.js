export async function onRequest({ request, env }) {
    // 从 KV 读取访问次数
    let count = await env.my_kv.get('visit_count');

    let visitCountInt = Number(count) || 0;
    visitCountInt += 1;

    // 写入 KV
    await env.my_kv.put('visit_count', String(visitCountInt));

    const res = JSON.stringify({
        visitCount: visitCountInt,
    });

    return new Response(res, {
        headers: {
            'content-type': 'application/json; charset=UTF-8',
            'Access-Control-Allow-Origin': '*',
        },
    });
}
